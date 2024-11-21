import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';
import { jsonResponse } from '@/lib/utils';

export async function POST(request: NextRequest) {
    const authResult = await authenticate(request);

    // ตรวจสอบว่า authResult เป็น NextResponse หรือไม่
    if (authResult instanceof NextResponse) {
        
        return authResult; // ส่งคืน Unauthorized Response
    }

    return jsonResponse(200, {
        status: {
            code: 200,
            text: "200 OK"
        },
        message: 'Authorized',
        data: null
    });

}
