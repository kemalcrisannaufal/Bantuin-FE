import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
  data?: {
    user?: {
      fullname?: string;
    };
  };
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export { IRegister, ILogin, UserExtended, SessionExtended, JWTExtended };
