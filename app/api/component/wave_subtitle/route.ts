import { NextResponse } from "next/server";

const HOST = process.env.NEXT_PUBLIC_HOST;

export async function GET(request: Request) {
  const response = [
    { content: "1", index: 0, start: 500, end: 1500 },
    { content: "2", index: 1, start: 2000, end: 3500 },
    { content: "3", index: 2, start: 4000, end: 5500 },
    { content: "4", index: 3, start: 6000, end: 7500 },
    { content: "5", index: 4, start: 9000, end: 15000 },
    { content: "6", index: 5, start: 19000, end: 24000 },
    { content: "7", index: 6, start: 30000, end: 31000 },
    { content: "8", index: 7, start: 35000, end: 40000 },
  ];
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
