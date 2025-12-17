import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, message: 'Abonelik özelliği geçici olarak devre dışı bırakıldı.' },
    { status: 503 }
  );
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Abonelik özelliği geçici olarak devre dışı bırakıldı.' },
    { status: 503 }
  );
}
