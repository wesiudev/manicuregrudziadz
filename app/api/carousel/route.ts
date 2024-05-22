import { NextResponse } from "next/server";
import carousel from "@/public/carousel.json";

export async function GET() {
    return NextResponse.json(carousel)
}