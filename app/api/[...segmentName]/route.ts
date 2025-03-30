import { getActionApiBySegements } from "@vape/actions/api";
import { authOptions } from "@vape/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            segmentName: string[];
        }>;
    }
) {
    const { segmentName } = await params;
    return getActionApiBySegements(request, segmentName, "GET")
        .then((response) => {
            return NextResponse.json(response, { status: 200 });
        })
        .catch((error) => {
            console.error(error);
            return notFound();
        });
}

export async function POST(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            segmentName: string[];
        }>;
    }
) {
    const { segmentName } = await params;
    const res = await request.json();

    const session = await getServerSession(authOptions);

    return getActionApiBySegements(request, segmentName, "POST", res, session)
        .then((response) => {
            return NextResponse.json(response, { status: 200 });
        })
        .catch((error) => {
            console.error(error);
            return notFound();
        });
}
