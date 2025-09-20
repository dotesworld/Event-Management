import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET endpoint to retrieve current content
export async function GET() {
  try {
    const contentPath = path.join(process.cwd(), 'src', 'data', 'content.json');
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to read content' },
      { status: 500 }
    );
  }
}

// POST endpoint to update content
export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json();
    const contentPath = path.join(process.cwd(), 'src', 'data', 'content.json');
    
    // Read current content
    const currentContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    // Merge updates
    const updatedContent = { ...currentContent, ...updates };
    
    // Write back to file
    fs.writeFileSync(contentPath, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update specific sections
export async function PUT(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    const contentPath = path.join(process.cwd(), 'src', 'data', 'content.json');
    
    // Read current content
    const currentContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    // Update specific section
    const updatedContent = {
      ...currentContent,
      [section]: { ...currentContent[section as keyof typeof currentContent], ...data }
    };
    
    // Write back to file
    fs.writeFileSync(contentPath, JSON.stringify(updatedContent, null, 2));
    
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { error: 'Failed to update section' },
      { status: 500 }
    );
  }
}