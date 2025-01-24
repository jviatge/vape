import { getVapeConfig } from "@vape/actions/config";
import LoginForm from "@vape/components/auth/LoginForm";
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
    const config = await getVapeConfig();
    const user = session?.user;

    if (user) {
        redirect("/dashboard");
    }

    return <LoginForm config={config} />;
};

export default LoginPage;
