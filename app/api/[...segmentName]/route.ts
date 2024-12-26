import { getActionApiBySegements } from "@vape/actions/api";
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
            console.log("response", response);
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
    return getActionApiBySegements(request, segmentName, "POST", res)
        .then((response) => {
            return NextResponse.json(response, { status: 200 });
        })
        .catch((error) => {
            console.error(error);
            return notFound();
        });
}
