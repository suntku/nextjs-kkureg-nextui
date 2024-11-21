import { NextRequest, NextResponse } from "next/server";
import { signJwtAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { jsonResponse } from "@/lib/utils";
import { authenticate } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const authResult = await authenticate(request);

        if (authResult instanceof NextResponse) {
            
            return authResult; 
        }

        const user = await prisma.user.findFirst({
            where: {
                user_id: authResult.user_id, 
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
            const result = {
              accessToken
            }
           
            return jsonResponse(200, {
              status: {
                code: 200,
                text: "200 OK"
              },
              message: "Ok refresh",
              data: result
            });
        
          } else {
           
            return jsonResponse(401, {
              status: {
                code: 401,
                text: "401 Unauthorized"
              },
              message: "User ID does not exist",
              data: null
            });
          }
    } catch (error:any) {
        return jsonResponse(500, {
            status: {
              code: 500,
              text: "Internal Server Error"
            },
            message: error.message,
            errors: error
          });
    }finally {
        await prisma.$disconnect();
    }
}