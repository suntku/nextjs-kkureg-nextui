import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from "@/lib/jwt";
import { jsonResponse } from './utils';

type AuthenticatedUser = { 
    user_id: number ,
    username: string,
    email: string,
    prefix: string,
    name:string,
    familyname: string,
    middlename: string,
    prefix_en: string,
    name_en: string,
    familyname_en: string,
    middlename_en: string,
    account_status: string,
    faculty_name: string,
    current_role: string,
    user_key: string,
    iat:  number ,
    exp:  number ,
};

export async function authenticate(request: NextRequest): Promise<AuthenticatedUser | NextResponse> {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return jsonResponse(401, {
            status: {
                code: 401,
                text: "401 Unauthorized"
            },
            message: 'Unauthorized: Missing or invalid token'

        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyJwt(token) as AuthenticatedUser;
        console.log(decoded)
        return decoded;
    } catch (error) {
        return jsonResponse(401, {
            status: {
                code: 401,
                text: "401 Unauthorized"
            },
            message: 'Unauthorized: Invalid or expired token'

        });
    }
}
