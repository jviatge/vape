import { getLogo } from "@vape/actions/config";
import LoginForm from "@vape/components/core/auth/LoginForm";
import { authOptions } from "@vape/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
