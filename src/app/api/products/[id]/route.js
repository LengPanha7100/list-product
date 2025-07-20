import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// PUT - Update a product
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { type, name, size, dueDate, quantity, price, description } = body
    
    // Validate required fields
    if (!name || !quantity || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, quantity, price' },
        { status: 400 }
      )
    }

    // Find or create category if type is provided
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

    // Prepare update data
    const updateData = {
      name: name,
      description: description || `${name} - ${type || 'Product'}`,
      price: parseFloat(price),
      qty: parseInt(quantity)
    }

    // Add category_id if we have a category
    if (category) {
      updateData.category_id = category.id
    }
    
    const product = await prisma.product_tb.update({
      where: {
        id: parseInt(id)
      },
      data: updateData,
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
    
    return NextResponse.json({ success: true, data: transformedProduct })
  } catch (error) {
    console.error('Error updating product:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a product
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    await prisma.product_tb.delete({
      where: {
        id: parseInt(id)
      }
    })
    
    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
} 