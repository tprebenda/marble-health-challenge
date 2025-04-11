import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    const body = await req.json();

    const updated = await prisma.event.update({
      where: { id: parsedId },
      data: {
        title: body.title,
        details: body.details,
        attendees: body.attendees,
        start: new Date(body.start),
        end: new Date(body.end),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/[id]/events error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    await prisma.event.delete({ where: { id: parsedId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/[id]/events error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
