import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title: body.title,
      details: body.details,
      attendees: body.attendees,
      start: new Date(body.start),
      end: new Date(body.end),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
}