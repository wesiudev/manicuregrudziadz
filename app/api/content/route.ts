import { NextResponse } from "next/server";
import serviceSlugs from "@/public/serviceSlugs.json";

export async function GET() {
  return NextResponse.json(serviceSlugs);
}
