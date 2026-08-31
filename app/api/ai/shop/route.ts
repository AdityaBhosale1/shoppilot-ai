import { NextRequest, NextResponse } from "next/server";
import { runAICommerceWorkflow, clearSessionMemory } from "@/lib/ai/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId = "SP-1047", message, action } = body;

    // Handle session reset
    if (action === "RESET_SESSION") {
      clearSessionMemory(sessionId);
      return NextResponse.json({ success: true, message: "Session memory cleared." });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "MISSING_MESSAGE",
          message: "A valid natural language shopping message is required.",
        },
        { status: 400 }
      );
    }

    // Execute dual-agent AI commerce workflow
    const result = await runAICommerceWorkflow(sessionId, message.trim());

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("AI Shop Route Error:", msg);
    return NextResponse.json(
      {
        success: false,
        error: "AI_WORKFLOW_ERROR",
        message: "AI service is temporarily unavailable. No purchase action was taken.",
        detail: msg,
      },
      { status: 500 }
    );
  }
}
