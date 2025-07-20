import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET - Fetch all products with category information
export async function GET() {
  try {
    const products = await prisma.product_tb.findMany({
      include: {
        category_tb: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    // Transform data to match frontend expectations
    const transformedProducts = products.map(product => ({
      id: product.id,
      type: product.category_tb?.name || 'ប្រចាំថ្ងៃ',
      name: product.name || '',
      size: 'មធ្យម', // Default size since not in your schema
      dueDate: new Date().toISOString().split('T')[0], // Default to today
      quantity: product.qty || 0,
      price: product.price || 0,
      amount: (product.qty || 0) * (product.price || 0),
      description: product.description || ''
    }))
    
    return NextResponse.json({ success: true, data: transformedProducts })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create a new product
export async function POST(request) {
  try {
    const body = await request.json()
    const { type, name, size, dueDate, quantity, price, description } = body
    
    // Validate required fields
    if (!name || !quantity || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, quantity, price' },
        { status: 400 }
      )
    }

    // Find or create category
    let category = null
    if (type) {
      category = await prisma.category_tb.findFirst({
        where: { name: type }
      })
      
      if (!category) {
        category = await prisma.category_tb.create({
          data: {
            name: type,
            description: `Category for ${type} products`
          }
        })
      }
    }
    
    const product = await prisma.product_tb.create({
      data: {
        name: name,
        description: description || `${name} - ${type || 'Product'}`,
        price: parseFloat(price),
        qty: parseInt(quantity),
        category_id: category?.id || 1 // Default category if none found
      },
      include: {
        category_tb: {
          select: {
            name: true
          }
        }
      }
    })

    // Transform response to match frontend expectations
    const transformedProduct = {
      id: product.id,
      type: product.category_tb?.name || type,
      name: product.name,
      size: size || 'មធ្យម',
      dueDate: dueDate,
      quantity: product.qty,
      price: product.price,
      amount: product.qty * product.price,
      description: product.description
    }
    
    return NextResponse.json({ success: true, data: transformedProduct }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 