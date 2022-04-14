import { User } from "../../user/entities/user.entity";

export class ResponseLogin {
    access_token: string;
    user: User;
}