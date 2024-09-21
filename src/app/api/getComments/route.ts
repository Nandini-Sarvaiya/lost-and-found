// src/app/api/getComments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, initializeDb } from '@/lib/database';

export async function GET(req: NextRequest) {
  await initializeDb();
  const database = await db; // Await the promise to get the Database instance
  const comments = await database.all('SELECT * FROM comments');
  return NextResponse.json(comments);
}
