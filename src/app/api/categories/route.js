import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET - Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category_tb.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST - Create a new category
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, description } = body
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      )
    }
    
    // Check if category already exists
    const existingCategory = await prisma.category_tb.findFirst({
      where: { name: name }
    })
    
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 409 }
      )
    }
    
    const category = await prisma.category_tb.create({
      data: {
        name: name,
        description: description || `Category for ${name} products`
      }
    })
    
    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
} 