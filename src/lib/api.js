// API utility functions for product operations

const API_BASE_URL = '/api'

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error)
    throw error
  }
}

// Product API functions
export const productApi = {
  // Fetch all products
  getAll: async () => {
    return apiRequest('/products')
  },

  // Create a new product
  create: async (productData) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  },

  // Update a product
  update: async (id, productData) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  },

  // Delete a product
  delete: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    })
  },
}

// Category API functions
export const categoryApi = {
  // Fetch all categories
  getAll: async () => {
    return apiRequest('/categories')
  },

  // Create a new category
  create: async (categoryData) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    })
  },
}

// Error handling utility
export const handleApiError = (error) => {
  if (error.message.includes('Failed to fetch')) {
    return 'បាត់ការភ្ជាប់អ៊ីនធឺណេត។ សូមពិនិត្យការភ្ជាប់របស់អ្នក។'
  } else if (error.message.includes('404')) {
    return 'រកមិនឃើញទំនិញដែលអ្នកស្វែងរក។'
  } else if (error.message.includes('400')) {
    return 'ព័ត៌មានដែលអ្នកបញ្ចូលមិនត្រឹមត្រូវ។ សូមពិនិត្យម្តងទៀត។'
  } else if (error.message.includes('409')) {
    return 'ទិន្នន័យនេះមានរួចហើយ។ សូមប្រើឈ្មោះផ្សេង។'
  } else if (error.message.includes('500')) {
    return 'មានបញ្ហាក្នុងប្រព័ន្ធ។ សូមព្យាយាមម្តងទៀតក្រោយម្ដង។'
  } else {
    return 'មានបញ្ហាមិនរំពឹងទុក។ សូមព្យាយាមម្តងទៀត។'
  }
} 