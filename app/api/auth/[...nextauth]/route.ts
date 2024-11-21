
import axios from "axios";
import NextAuth, { NextAuthOptions }  from 'next-auth'
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from 'next/headers'; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/lib/constants';
import JSONbig from "json-bigint";


 const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                userAgent: { label: "userAgent", type: "text" },
            },
            async authorize(credentials, req) {
                let jsonFrom = JSON.stringify({
                    loginToken: credentials?.username,
                    userAgent:credentials?.userAgent
                });
                const response = await (await axios.request({
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXTAUTH_URL}/api/auth/loginToken`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 60000,
                    data: jsonFrom,
                    transformResponse: [data => JSONbig.parse(data)]
                })).data



                if (response.status.code === 200) {
                    const user = await response.data;
                    if (user) {
                        cookies().set({
                            name: ACCESS_TOKEN,
                            value: user.accessToken
                        });
                        cookies().set({
                            name: REFRESH_TOKEN,
                            value: user.refreshToken
                        });
                        
                        return user;
                    } else {
                        throw new Error(response.message)
                    }

                } else {
                    throw new Error(response.message)
                }
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        // })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
              }
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },

    pages: {
        signIn: '/auth/signin',
        // error: '/auth/signin',
    },
    
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
