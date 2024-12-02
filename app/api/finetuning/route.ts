import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch("https://api.mistral.ai/v1/fine_tuning/jobs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(await response.text());
      throw new Error(await response.text());
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create fine-tuning job",
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    // If jobId is provided, fetch the details of that specific job
    if (jobId) {
      const response = await fetch(
        `https://api.mistral.ai/v1/fine_tuning/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Otherwise, fetch all fine-tuning jobs
    const response = await fetch("https://api.mistral.ai/v1/fine_tuning/jobs", {
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
        error: error instanceof Error ? error.message : "Failed to fetch jobs",
      },
      { status: 500 },
    );
  }
}
