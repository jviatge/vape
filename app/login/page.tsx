"use client";

import { Button } from "@vape/components/ui/button";
import { Card } from "@vape/components/ui/card";
import { Input } from "@vape/components/ui/input";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Implement login logic
    };

    return (
        <div className="shadow-2xl bg-secondary">
            <div className="grid-cols-2 md:grid">
                <div className="bg-[url('/kayak.jpg')] bg-cover bg-center" />
                <div className="flex flex-col items-center justify-center h-screen">
                    <Card className="p-8 w-2/3 bg-background">
                        <div className="text-xl text-center">Login</div>
                        <div className="pt-3">
                            <Input
                                type="text"
                                placeholder="Email Address"
                                className="w-full my-3"
                            />
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full my-3"
                            />
                        </div>
                        <Button className="w-full">Login</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
