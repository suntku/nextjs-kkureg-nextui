
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_SSO } from "@/lib/constants";

export async function POST(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const formData = await request.formData();
    // Convert formData to an object
    const formEntries = Object.fromEntries(formData.entries());

    // Create a new response
    const response = NextResponse.redirect(`${baseUrl}/login`, 302);

    // Set the cookie on the response
    response.cookies.set(ACCESS_TOKEN_SSO, formEntries.access_token.toString());

    return response;
}