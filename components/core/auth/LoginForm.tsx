"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TransitionProvider } from "@vape/components/providers/TransitionProvider";
import { Button } from "@vape/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@vape/components/ui/form";
import { Input } from "@vape/components/ui/input";
import { useToast } from "@vape/components/ui/use-toast";
import { ArrowRight, KeyRound, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    id: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").max(50),
});

export default function LoginForm({
    logo,
    bgLogin,
}: {
    logo: StaticImageData;
    bgLogin: StaticImageData;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            password: "",
        },
    });

    const handleSubmitAuth = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        const responseSignIn = await signIn("credentials", {
            id: data.id,
            password: data.password,
            redirect: false,
        });

        if (!responseSignIn?.ok) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Bad credentials",
            });
        } else {
            toast({
                title: "Succès",
                description: "Vous êtes connecté avec succès.",
            });
            router.refresh();
            router.push("/dashboard");
        }
    };

    return (
        <div className="shadow-2xl bg-secondary">
            <TransitionProvider type="left-right" className="grid-cols-2 md:grid">
                <div className="flex flex-col items-center justify-center h-screen shadow-2xl">
                    <Image
                        src={logo.src}
                        alt="logo"
                        className="w-2/5 h-auto text-primary"
                        height={100}
                        width={100}
                    />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitAuth)} className="p-8 w-2/3">
                            {/* <div className="text-xl text-center text-primary">Se connecter</div> */}
                            <div className="py-3">
                                <FormField
                                    key={"email"}
                                    control={form.control}
                                    name={"id"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <div className="h-10 flex items-center bg-background rounded-l-md border-l border-y">
                                                        <User
                                                            className="pointer-events-none mx-3"
                                                            size={18}
                                                        />
                                                    </div>
                                                    <Input
                                                        id="email"
                                                        disabled={loading}
                                                        {...field}
                                                        placeholder="Identifiant"
                                                        className="w-full my-3 rounded-l-none rounded-r-md border border-border"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    key={"password"}
                                    control={form.control}
                                    name={"password"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <div className="h-10 flex items-center bg-background rounded-l-md border-l border-y">
                                                        <KeyRound
                                                            className="pointer-events-none mx-3"
                                                            size={18}
                                                        />
                                                    </div>
                                                    <Input
                                                        id="password"
                                                        disabled={loading}
                                                        {...field}
                                                        type="password"
                                                        placeholder="Mot de passe"
                                                        className="w-full my-3 rounded-l-none rounded-r-md border-border"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button disabled={loading} className="w-full" type="submit">
                                Se connecter <ArrowRight className="ml-auto h-5 w-5 " />
                            </Button>
                        </form>
                    </Form>
                </div>
                {/* bg-[url('/pontdugard.jpg')]  */}
                <div
                    style={{ backgroundImage: `url('${bgLogin.src}')` }}
                    className="bg-cover bg-center"
                />
            </TransitionProvider>
        </div>
    );
}
