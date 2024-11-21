export interface Login {
    username: string;
    password: string;
    userAgent:string;
    type:string;
}

export interface LoginToken {
    loginToken: string;
    userAgent:string;
}


export interface Email {
    email: string;
    otp: number;
}

export interface EmailOtp {
    email: string;
    number_code: number;
    ref_code: string;
}

export interface Checkbox {
    checkbox: boolean;
    password:string
    confrim_password:string
}



  