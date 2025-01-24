import bcrypt from "bcrypt";

export const hash = async (password: string) => {
    return await bcrypt.hash(password, 10);
};
