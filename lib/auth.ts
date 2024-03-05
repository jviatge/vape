import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getVapeConfig } from "@vape/actions/config";
import { getModel } from "@vape/actions/resources";
import db from "@vape/db";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                id: { label: "id", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.id || !credentials?.password) return null;

                const config = await getVapeConfig();
                const classModel = await getModel(config.auth.model);
                const user = await classModel[config.auth.get](
                    config.auth.uniqueField,
                    credentials.id
                );

                if (!user) return null;

                const passwordMatch = await compare(credentials.password, user.password);

                if (!passwordMatch) return null;

                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    first_name: token.first_name,
                    last_name: token.last_name,
                    email: token.email,
                    role: token.role,
                },
            };
        },
    },
};
