import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.mistral.ai/v1/files", {
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch files",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("Invalid file upload");
    }

    const uploadResponse = await fetch("https://api.mistral.ai/v1/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(await uploadResponse.text());
    }

    const data = await uploadResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 },
    );
  }
}
