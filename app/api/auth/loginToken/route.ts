"use server"
import { NextRequest, NextResponse } from "next/server";
import authService from "@/services/auth.service";
import { LoginToken } from "@/helpers/login.model";
import { User } from "@/helpers/user.model";
import { signJwtAccessToken, signJwtRefreshToken } from "@/lib/jwt";
import { getIpAddress, jsonResponse } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { md5 } from "js-md5";
import { AccountStatus } from "@prisma/client";

const statusMap: Record<string, AccountStatus> = {
    "A": "A",
    "I": "I",
    "W": "W",
    "C": "C"
  };

export async function POST(request: NextRequest) {

    try {
        const login: LoginToken = await request.json();
        if (!login) {
            return jsonResponse(400, {
                status: {
                    code: 400,
                    text: "400 Bad Request"
                },
                message: "Request body is token required",
            });
        }

        if (!login.loginToken) {
            return jsonResponse(400, {
                status: {
                    code: 400,
                    text: "400 Bad Request"
                },
                message: "token required",
            });

        }


        const isValidToken = await authService.getSSOToken(login.loginToken);

        const ipAddress = getIpAddress(request)
        var currentdate = new Date();
        var account_status_data = statusMap["A"] ;
        // return jsonResponse(200, {
        //     status: {
        //         code: 200,
        //         text: "200 OK"
        //     },
        //     message: "ok",
        //     data: isValidToken
        // });
        if (isValidToken.status === "success") {

            const resultUsers = await prisma.user.findFirst({
                where: {
                    citizen_id: isValidToken.data.citizen_id,
                }
            });


            if (!resultUsers) {
                 await prisma.user.create({
                    data: {
                        //   user_id: parseInt(isValidToken.data.user_id), // Prisma handles autoincrement; this might not be needed
                        username: isValidToken.data.username,
                        email: isValidToken.data.mail,
                        citizen_id: isValidToken.data.citizen_id,
                        prefix: isValidToken.data.title_th,
                        name: isValidToken.data.firstname_th,
                        middlename: "",
                        familyname: isValidToken.data.lastname_th,
                        prefix_en: isValidToken.data.title,
                        name_en: isValidToken.data.firstname,
                        familyname_en: isValidToken.data.lastname,
                        middlename_en: "",
                        faculty_id: isValidToken.data.faculty_id == "" ? null : isValidToken.data.faculty_id,
                        faculty_name: isValidToken.data.facultyName,
                        created_at: currentdate,
                        updated_at: currentdate,
                        created_user_id: parseInt(isValidToken.data.user_id),
                        updated_user_id: parseInt(isValidToken.data.user_id),
                        sso_id: isValidToken.data.user_id,
                        sso_account_type: isValidToken.data.account_type,
                        user_key: md5(isValidToken.data.citizen_id),
                        current_role: isValidToken.data.account_type,
                    },
                });

            } else {
                if (resultUsers.account_status != "W") {
                    account_status_data = statusMap[resultUsers.account_status] 
                }
                await prisma.user.update({
                    where: {
                        user_id: resultUsers.user_id, // Matching record by citizen_id
                    },
                    data: {
                      account_status: account_status_data, // Set the new account status
                      prefix: isValidToken.data.title_th,
                      name: isValidToken.data.firstname_th,
                      familyname: isValidToken.data.lastname_th,
                      prefix_en: isValidToken.data.title,
                      name_en: isValidToken.data.firstname,
                      familyname_en: isValidToken.data.lastname,
                      faculty_id: isValidToken.data.faculty_id ? isValidToken.data.faculty_id : null, // Handle nullable faculty_id
                      faculty_name: isValidToken.data.facultyName,
                      updated_at: currentdate,
                      sso_id: isValidToken.data.user_id,
                      sso_account_type: isValidToken.data.account_type,
                    },
                  });
                  
            }

                const user = await prisma.user.findFirst({
                    where: {
                        citizen_id: isValidToken.data.citizen_id, 
                        account_status: "A"
                    },
                    select: {
                        user_id: true,
                        username: true,
                        email: true,
                        prefix: true,
                        name: true,
                        familyname: true,
                        middlename: true,
                        prefix_en: true,
                        name_en: true,
                        familyname_en: true,
                        middlename_en: true,
                        account_status: true,
                        faculty_name: true,
                        current_role: true,
                        user_key: true,
                    },
                });
            if (user) {

                const accessToken = signJwtAccessToken(user)
                const refreshToken = signJwtRefreshToken({ "user_id": user.user_id, "user_key": user.user_key })

                const result = {
                    ...user,
                    accessToken,
                    refreshToken
                }
                await prisma.log_login.create({
                    data: {
                        user_id: user.user_id,
                        action_type: "SSO",
                        status: "A",
                        ip: ipAddress || "",
                        ua: login.userAgent,
                        created_at: currentdate,
                    },
                });
                
                return jsonResponse(200, {
                    status: {
                        code: 200,
                        text: "200 OK"
                    },
                    message: "ok",
                    data: result
                });
            } else {
                await prisma.log_login.create({
                    data: {
                        user_id: parseInt(isValidToken.data.user_id),
                        action_type: "SSO",
                        status: "W",
                        ip: ipAddress || "",
                        ua: login.userAgent,
                        message: "You do not have permission to access the system",
                        created_at: currentdate,
                    },
                });
                

                return jsonResponse(200, {
                    status: {
                        code: 401,
                        text: "401 (Unauthorized)"
                    },
                    message: "You do not have permission to access the system",
                    data: null
                });
            }



        } else {
            return jsonResponse(401, {
                status: {
                    code: 401,
                    text: "401 (Unauthorized)"
                },
                message: isValidToken.message,
                data: null
            });
        }




    } catch (err: any) {
        return jsonResponse(500, {
            status: {
                code: 500,
                text: "Internal Server Error"
            },
            message: err.message,
            errors: err
        });

    } finally {
        await prisma.$disconnect();
    }
}