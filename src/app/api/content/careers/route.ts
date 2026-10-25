import { NextResponse } from "next/server";
import { getCareers } from "@/lib/cms";

export async function GET() {
  const careers = await getCareers();
  return NextResponse.json(careers);
}
