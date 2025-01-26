"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@vape/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@vape/components/ui/form";
import { Input } from "@vape/components/ui/input";
import { useToast } from "@vape/components/ui/use-toast";
import { VapeConfig } from "@vape/types/configs";
import { ArrowRight, KeyRound, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TransitionProvider } from "../providers/Transition.provider";

const formSchema = z.object({
    id: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").max(50),
});

export default function LoginForm({ config }: { config: VapeConfig }) {
    const [loading, setLoading] = useState(false);
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
            setTimeout(() => {
                window.location.href = "/dashboard";
                toast({
                    title: "Succès",
                    description: "Vous êtes connecté avec succès.",
                });
            }, 1000);
        }
    };

    return (
        <div className="shadow-2xl bg-secondary">
            <TransitionProvider type="left-right" className="grid-cols-2 md:grid">
                <div className="flex flex-col items-center justify-center h-screen shadow-2xl">
                    {config.logo ? (
                        <Image
                            src={"/assets/" + config.logo}
                            alt="logo"
                            className="w-2/5 h-auto text-primary"
                            height={100}
                            width={100}
                        />
                    ) : null}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitAuth)} className="p-8 w-2/3">
                            {/* <div className="text-xl text-center text-primary">Se connecter</div> */}
                            <div className="py-3">
                                <FormField
                                    key={"email"}
                                    control={form.control}
                                    name={"id"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col my-3">
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
                                                        className="w-full rounded-l-none rounded-r-md border border-border"
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
                                        <FormItem className="flex flex-col my-3">
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
                                                        className="w-full rounded-l-none rounded-r-md border-border"
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
                    style={{ backgroundImage: `url('/assets/${config.bgLogin}')` }}
                    className="bg-cover bg-center"
                />
            </TransitionProvider>
        </div>
    );
}
