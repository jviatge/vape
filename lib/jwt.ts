import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1d",
};

export function signJwtAccessToken(
    payload: JwtPayload,
    options: SignOption = DEFAULT_SIGN_OPTION
): string | null {
    const secretKey = process.env.JWT_SECRET;
    return secretKey ? jwt.sign(payload, secretKey, options) : null;
}

export function verifyJwt(token: string) {
    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secretKey);
        return decoded as JwtPayload;
    } catch (error) {
        console.error(error);
    }
}
