import { NextRequest, NextResponse } from 'next/server';
import { db, initializeDb } from '@/lib/database';

export async function POST(req: NextRequest) {
  await initializeDb(); // Ensure the database is initialized
  const { imageId, description, name, contact, content } = await req.json();

  if (!imageId || !description || !name || !contact || !content) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Wait for the db to be resolved
  const database = await db; // Await the promise to get the Database instance

  const result = await database.run(
    'INSERT INTO comments (imageId, description, name, contact, content) VALUES (?, ?, ?, ?, ?)',
    [imageId, description, name, contact, content]
  );

  return NextResponse.json({
    id: result.lastID,
    imageId,
    description,
    name,
    contact,
    content,
  });
}
