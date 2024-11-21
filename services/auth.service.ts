import axios from "@/lib/axios";


const VerifyProtected = async (refreshToken: any) => {
    try {
        const response = await (
            await axios.post("/api/protected", {}, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            })
        ).data;

        return response as any;
        // console.log(response);
    } catch (error) {
        return error as any;
    }
};

export const getSSOToken = async (token: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SSO_PUBLIC_KKU_URL}/gettoken?client_id=${process.env.NEXT_PUBLIC_SSO_PUBLIC_CLIENT_ID}`;
      const response = await (
        await axios.get<any>(url, {
          headers: {
            Authorization: token,
          },
        })
      ).data;
      return response;
    } catch (error) {
      return error;
    }
  };

const exportedFunctions = {
    VerifyProtected,
    getSSOToken
};

// Export the object as the default export
export default exportedFunctions;

