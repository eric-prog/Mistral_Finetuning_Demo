import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mistralFormData = new FormData();
    mistralFormData.append("file", file);
    mistralFormData.append("purpose", "fine-tune");

    const response = await fetch("https://api.mistral.ai/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: mistralFormData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    );
  }
}
