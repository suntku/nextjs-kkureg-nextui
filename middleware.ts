import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { REFRESH_TOKEN } from './lib/constants';

// กำหนดเส้นทางที่ต้องการป้องกัน
const protectedPaths = ['/'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // เว้นการตรวจสอบสำหรับเส้นทางที่เริ่มต้นด้วย /api
    if (pathname.startsWith('/api')) {
        return NextResponse.next(); // อนุญาตให้ผ่าน
    }

    // ตรวจสอบ token สำหรับเส้นทางที่ต้องการป้องกัน
    const token = request.cookies.get(REFRESH_TOKEN)?.value;
    if (pathname === '/login' && token) {
        const homeUrl = new URL('/', request.url); // Redirect to home page if token is present
        return NextResponse.redirect(homeUrl);
    }
    
    if (protectedPaths.includes(pathname) && !token) {
        const loginUrl = new URL('/login', request.url); // เปลี่ยนไปหน้า login
        return NextResponse.redirect(loginUrl);
    }

    

    // อนุญาตให้ผ่าน
    return NextResponse.next();
}

// กำหนดเส้นทางที่ middleware จะทำงาน
export const config = {
    matcher: ['/((?!api).*)'],
};
