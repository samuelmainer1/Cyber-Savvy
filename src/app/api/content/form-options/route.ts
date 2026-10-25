import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";

/** Public endpoint consumed by the contact & booking forms for their dropdown options. */
export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}
