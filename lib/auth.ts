import db from "@database/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getVapeConfig } from "@vape/actions/config";
import { getModel } from "@vape/actions/resources";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60 * 2, // 48 hours
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

                if (!user.active) return null;

                const passwordMatch = await compare(credentials.password, user.password);

                if (!passwordMatch) return null;

                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role,
                    active: user.active,
                };
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: `${token.first_name} ${token.last_name}`,
                    first_name: token.first_name,
                    last_name: token.last_name,
                    email: token.email,
                    role: token.role,
                    active: token.active,
                },
            };
        },
    },
};
