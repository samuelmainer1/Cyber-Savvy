import { NextResponse } from "next/server";
import { getServices } from "@/lib/cms";

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}
