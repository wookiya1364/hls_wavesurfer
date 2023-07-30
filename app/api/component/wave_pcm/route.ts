import { NextResponse } from "next/server";

const HOST = process.env.NEXT_PUBLIC_HOST;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryParam = searchParams.get("pcmPath")?.trim()!;
  const response = await fetch(`${HOST}/${queryParam}`)
    .then(res => res.json())
    .then(res => res.data);
  return NextResponse.json(response);
}

export async function POST(request: Request) {
  console.log("POST");
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const { searchParams } = new URL(request.url);
  const strQueryParam = searchParams.get("data")?.trim()!;
  const queryParam: { name: string; type: string } = JSON.parse(strQueryParam);
}
