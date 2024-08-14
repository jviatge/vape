import { getLogo, getVapeConfig } from "@vape/actions/config";
import LoginForm from "@vape/components/core/auth/LoginForm";
import { authOptions } from "@vape/lib/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const config = await getVapeConfig();

    return {
        title: `Login | ${config.title}`,
    };
}

const LoginPage = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (user) {
        redirect("/dashboard");
    }

    const logo = await getLogo();

    return <LoginForm logo={logo} />;
};

export default LoginPage;
