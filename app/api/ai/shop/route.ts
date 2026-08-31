import { NextRequest, NextResponse } from "next/server";
import { runAICommerceWorkflow, clearSessionMemory } from "@/lib/ai/orchestrator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId = "SP-1047", message, prompt, action } = body;

    // Handle session reset
    if (action === "RESET_SESSION") {
      clearSessionMemory(sessionId);
      return NextResponse.json({ success: true, message: "Session memory cleared." });
    }

    // Accept either 'message' or 'prompt' property for complete parameter compatibility
    const rawMessage = message !== undefined && message !== null ? message : prompt;

    // Development Safe Diagnostics (No secret key logging)
    console.log("[ShopPilot Request Diagnostics]:", {
      sessionIdPresent: Boolean(sessionId),
      messageFieldPresent: rawMessage !== undefined && rawMessage !== null,
      messageLength: typeof rawMessage === "string" ? rawMessage.length : 0,
      action: action || "PROCESS_INTENT",
    });

    if (!rawMessage || typeof rawMessage !== "string" || rawMessage.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "INPUT_VALIDATION_FAILED",
          actor: "ShopPilot Request Validator",
          reason: "Shopping request is empty.",
          message: "A valid natural language shopping message is required.",
        },
        { status: 400 }
      );
    }

    const normalizedMessage = rawMessage.trim();

    // Execute dual-agent AI commerce workflow
    const result = await runAICommerceWorkflow(sessionId, normalizedMessage);

    return NextResponse.json({
      success: true,
      data: result,
      diagnostics: {
        messageFieldPresent: true,
        messageLength: normalizedMessage.length,
        sessionIdPresent: Boolean(sessionId),
      },
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
