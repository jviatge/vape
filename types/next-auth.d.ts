import "next-auth";

declare module "next-auth" {
    interface User {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    }
    interface Session {
        user: User & { first_name: string; last_name: string; email: string; role: string };
        token: { first_name: string; last_name: string; email: string; role: string };
    }
}
