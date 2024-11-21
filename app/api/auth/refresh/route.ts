import { NextRequest, NextResponse } from "next/server";
import { signJwtAccessToken, verifyJwtRefreshToken } from "@/lib/jwt";

import { jsonResponse } from "@/lib/utils";

export async function POST(request: NextRequest) {

}