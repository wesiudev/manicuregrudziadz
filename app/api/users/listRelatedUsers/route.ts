import { getDocuments, getUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const uid = req.nextUrl.searchParams.get("uid");

  if (secret !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const res = await getDocuments("users");
  const relatedUsers = res.filter(
    (user) => user.referer === uid && !user.isCollected
  );

  return NextResponse.json(relatedUsers);
}
