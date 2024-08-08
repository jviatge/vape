import "next-auth";

declare module "next-auth" {
    interface User {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        active: boolean;
    }
    interface Session {
        user: User & {
            first_name: string;
            last_name: string;
            email: string;
            role: string;
            avtive: boolean;
        };
        token: { first_name: string; last_name: string; email: string; role: string };
    }
}
