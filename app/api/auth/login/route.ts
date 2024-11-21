import { NextRequest } from "next/server";

import { jsonResponse } from "@/lib/utils";
import { signJwtAccessToken, signJwtRefreshToken } from "@/lib/jwt";
import { LoginSchema } from "@/helpers/login.schema";
import * as yup from 'yup';
import { prisma } from "@/lib/prisma";

type UseRequestBody = yup.InferType<typeof LoginSchema>;

export async function POST(request: NextRequest) {

    try {

        const requestBody: UseRequestBody = await request.json();

        if (!requestBody) {
            return jsonResponse(400, {
                status: {
                    code: 400,
                    text: "400 Bad Request"
                },
                message: "Request body is empty",


            });

        }

        await LoginSchema.validate(requestBody, { abortEarly: false });


        const user = await prisma.user.findFirst({
            where: {
                email: requestBody.username, 
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
            const refreshToken = signJwtRefreshToken({ "user_id": user.user_id })

            const result = {
                ...user,
                accessToken,
                refreshToken
            }

            return jsonResponse(200, {
                status: {
                    code: 200,
                    text: "200 OK"
                },
                message: "ok",
                data: result
            });

        } else {

            return jsonResponse(401, {
                status: {
                    code: 401,
                    text: "401 (Unauthorized)"
                },
                message: "Username does not exist",
                data: null
            });
        }

    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            return jsonResponse(400, {
                status: {
                    code: 400,
                    text: "400 Bad Request"
                },
                message: error.errors[0],
                errors: error.errors
            });
        }
        return jsonResponse(500, {
            status: {
                code: 500,
                text: "Internal Server Error"
            },
            message: error.message,
            errors: error
        });
    } finally {
        await prisma.$disconnect();
    }
}