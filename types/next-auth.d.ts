import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {


    user: {
      user_id: number;
      username: string;
      email: string;
      prefix: string;
      name: string;
      familyname: string;
      middlename: string;
      prefix_en: string;
      name_en: string;
      familyname_en: string;
      middlename_en: string;
      account_status: string;
      faculty_name: string;
      current_role: string;
      user_key: string;
      accessToken: string;
      refreshToken: string;
    };

  }
}