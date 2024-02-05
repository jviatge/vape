"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@vape/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@vape/components/ui/form";
import { Input } from "@vape/components/ui/input";
import { useToast } from "@vape/components/ui/use-toast";
import { ArrowRight, AtSign, KeyRound } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
    id: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").max(50),
});

export default function LoginForm() {
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
                title: "Success",
                description: "You have been logged in",
            });
            router.refresh();
            router.push("/dashboard");
        }
    };

    return (
        <div className="shadow-2xl bg-secondary">
            <div className="grid-cols-2 md:grid">
                <div className="bg-[url('/kayak.jpg')] bg-cover bg-center" />
                <div className="flex flex-col items-center justify-center h-screen shadow-2x">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitAuth)} className="p-8 w-2/3">
                            <div className="text-xl text-center">Login</div>
                            <div className="py-3">
                                <FormField
                                    key={"email"}
                                    control={form.control}
                                    name={"id"}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <div className="h-10 flex items-center bg-primary-foreground rounded-l-md">
                                                        <AtSign
                                                            className="pointer-events-none mx-3"
                                                            size={18}
                                                        />
                                                    </div>
                                                    <Input
                                                        {...field}
                                                        placeholder="Email Address"
                                                        className="w-full my-3 rounded-l-none rounded-r-md"
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
                                                    <div className="h-10 flex items-center bg-primary-foreground rounded-l-md">
                                                        <KeyRound
                                                            className="pointer-events-none mx-3"
                                                            size={18}
                                                        />
                                                    </div>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="Password"
                                                        className="w-full my-3 rounded-l-none rounded-r-md"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button disabled={loading} className="w-full" type="submit">
                                Log in <ArrowRight className="ml-auto h-5 w-5 " />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
