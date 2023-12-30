import { getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const res = await getDocuments("services");

  return NextResponse.json(res);
}
