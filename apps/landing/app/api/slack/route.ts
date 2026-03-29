import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { phone } = await req.json();
    try {
        const response = await fetch("https://slack.com/api/chat.postMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SLACK_API_TOKEN}`,
            },
            body: JSON.stringify({
                channel: process.env.SLACK_CHANNEL_ID,
                text: phone,
            }),
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
