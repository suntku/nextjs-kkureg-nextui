import exp from "constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";
import { getJwtSecretKey, getJwtSecretKeyLoginToken, getJwtSecretKeyRefreshToken, getJwtSecretKeySignupToken } from "./constants";

interface signOption {
    expiresIn?: string | number;
}

interface UserJwtPayload {
    jti: string;
    iat: number;
    user_id: number;
}


const DEFAULT_ACCESS_TOKEN_OPTION: signOption = {
    expiresIn: "1d",
};

const DEFAULT_REFRESH_TOKEN_OPTION: signOption = {
    expiresIn: "2d",
};

export class AuthError extends Error { }

export function signJwtAccessToken(payload: JwtPayload, options: signOption = DEFAULT_ACCESS_TOKEN_OPTION) {
    const secretKey = getJwtSecretKey();
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

export function signJwtRefreshToken(payload: JwtPayload, options: signOption = DEFAULT_REFRESH_TOKEN_OPTION) {
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

export function signJwtSignupToken(payload: JwtPayload, options: signOption = DEFAULT_REFRESH_TOKEN_OPTION) {
    const secretKey = getJwtSecretKeySignupToken();
    const token = jwt.sign(payload, secretKey, options);
    return token;
};

export function signJwtLoginToken(payload: JwtPayload, options: signOption = DEFAULT_REFRESH_TOKEN_OPTION) {
    const secretKey = getJwtSecretKeyLoginToken();
    const token = jwt.sign(payload, secretKey, options);
    return token;
};


export function verifyJwt(token: string) {
    try {
        const secretKey = getJwtSecretKey();
        const decoded = jwt.verify(token, secretKey)
        return decoded as JwtPayload;
    } catch (error: any) {
        throw new AuthError('Your token has expired.')
    }

};

export function verifyJwtSignup(token: string) {
    try {
        const secretKey = getJwtSecretKeySignupToken();
        const decoded = jwt.verify(token, secretKey)
        return decoded as JwtPayload;
    } catch (error: any) {
        throw new AuthError('Your token has expired.')
    }

};

export function verifyJwtLogin(token: string) {
    try {
        const secretKey = getJwtSecretKeyLoginToken();
        const decoded = jwt.verify(token, secretKey)
        return decoded as JwtPayload;
    } catch (error: any) {
        throw new AuthError('Your token has expired.')
    }

};

export async function verifyJwtRefreshToken(token: string) {
    try {
      // Use HS256 for symmetric signing and verification
      const decoded = jwt.verify(token, getJwtSecretKeyRefreshToken(), { algorithms: ['HS256'] });
      return decoded;
    } catch (error:any) {
    //   console.log("JWT Verification failed:", error.message);
      throw new AuthError('Your token has expired.')
     
    }
  }






export async function verifyJwtToken(token: string) {
    try {
        const secretKey = getJwtSecretKey();
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(secretKey)
        );
        return verified.payload;
    } catch (error: any) {
        throw new AuthError('Your token has expired.')
    }
}