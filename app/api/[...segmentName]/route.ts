import { getActionApiBySegements } from "@vape/actions/api";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { segmentName: string[] } }) {
    return getActionApiBySegements(request, params.segmentName, "GET")
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
    { params }: { params: { segmentName: string[] } }
) {
    const res = await request.json();
    return getActionApiBySegements(request, params.segmentName, "POST", res)
        .then((response) => {
            return NextResponse.json(response, { status: 200 });
        })
        .catch((error) => {
            console.error(error);
            return notFound();
        });
}
