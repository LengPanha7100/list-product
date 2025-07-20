# Database Setup Guide - PostgreSQL

This application now uses **Prisma ORM** with **PostgreSQL** database for managing product data.

## 🔑 Prerequisites

- PostgreSQL database server running and accessible
- Database credentials (username, password, host, port, database name)

## 🚀 Quick Setup

### 1. Configure Database Connection
Create a `.env` file in your project root with your PostgreSQL connection details:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

**Replace with your actual values:**
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password  
- `localhost:5432`: Your PostgreSQL host and port
- `database_name`: Your database name

**Examples:**
```bash
# Local PostgreSQL
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/list_products?schema=public"

# Remote PostgreSQL with SSL
DATABASE_URL="postgresql://user:pass@host:5432/database?schema=public&sslmode=require"

# Cloud providers (Heroku, Azure, AWS, etc.)
DATABASE_URL="postgresql://user:pass@host.amazonaws.com:5432/database?sslmode=require"
```

### 2. Initialize the Database
Run the setup script to configure Prisma and create tables:

```bash
npm run db:setup
```

This will:
- Check your database connection
- Generate the Prisma client
- Create/update database tables
- Verify the setup

### 3. Start the Application
```bash
npm run dev
```

Your application will now be connected to your PostgreSQL database!

## 📊 Database Management

### View/Edit Database (Prisma Studio)
Open the visual database management interface:
```bash
npm run db:studio
```

### Reset Database Schema
If you need to reset the database schema (⚠️ **This will delete all data**):
```bash
npm run db:reset
```

### Manual Database Operations
```bash
# Pull existing schema from database
npx prisma db pull

# Push schema changes to database
npx prisma db push

# Generate Prisma client after schema changes
npx prisma generate
```

## 🗂️ Database Schema

The application creates the following table structure in PostgreSQL:

```sql
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,           -- Product category (សាច់, បន្លែ, ផ្លែឈើ, គ្រឿងសមុទ្រ, ប្រចាំថ្ងៃ)
  "name" TEXT NOT NULL,           -- Product name in Khmer
  "size" TEXT,                    -- Optional size field
  "dueDate" TEXT NOT NULL,        -- Date in YYYY-MM-DD format
  "quantity" INTEGER NOT NULL,    -- Quantity in stock
  "price" DOUBLE PRECISION NOT NULL,  -- Price per unit
  "amount" DOUBLE PRECISION NOT NULL, -- Total amount (quantity * price)
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
```

## 🔧 API Endpoints

The application provides the following RESTful API endpoints:

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create a new product
- `PUT /api/products/[id]` - Update a product by ID
- `DELETE /api/products/[id]` - Delete a product by ID

## 📁 File Structure

```
├── prisma/
│   └── schema.prisma           # Database schema definition (PostgreSQL)
├── src/
│   ├── lib/
│   │   ├── prisma.js          # Prisma client configuration
│   │   └── api.js             # API utility functions
│   └── app/
│       └── api/
│           └── products/      # API routes for CRUD operations
├── scripts/
│   └── setup-db.js           # Database setup script
├── .env                       # Environment variables (create this!)
└── DATABASE_SETUP.md          # This file
```

## 🆘 Troubleshooting

### Environment File Issues
**Problem**: "Environment variable not found: DATABASE_URL"
```bash
# Create .env file with your database connection:
echo 'DATABASE_URL="postgresql://username:password@host:5432/database?schema=public"' > .env
```

### Database Connection Issues
**Problem**: Connection refused or authentication failed
1. ✅ Verify PostgreSQL is running
2. ✅ Check your credentials are correct
3. ✅ Ensure the database exists
4. ✅ Test connection directly:
   ```bash
   # Test with psql (if available)
   psql "postgresql://username:password@host:5432/database"
   ```

### Table Creation Issues
**Problem**: Tables not being created
```bash
# Force push the schema
npx prisma db push --force-reset

# Or use migrations
npx prisma migrate dev --name init
```

### Client Generation Issues
**Problem**: Prisma client not found
```bash
# Regenerate the client
npx prisma generate

# Clear node modules and reinstall if needed
rm -rf node_modules && npm install
```

## 🔄 Migration from SQLite

If you previously used SQLite and want to migrate to PostgreSQL:

1. **Export data** (if you have existing data):
   ```bash
   npx prisma studio  # Backup your data manually
   ```

2. **Update configuration**:
   - Create `.env` file with PostgreSQL URL
   - Schema is already updated to use PostgreSQL

3. **Setup new database**:
   ```bash
   npm run db:setup
   ```

## 🎯 Features

✅ **Complete CRUD Operations** - Create, Read, Update, Delete products  
✅ **PostgreSQL Integration** - Professional-grade database  
✅ **Real-time Updates** - Changes are immediately reflected in the UI  
✅ **Error Handling** - User-friendly error messages in Khmer  
✅ **Loading States** - Visual feedback during API operations  
✅ **Data Persistence** - All data safely stored in PostgreSQL  
✅ **Database Management** - Easy database viewing with Prisma Studio  
✅ **Production Ready** - Scalable PostgreSQL backend  

## 🌐 Deployment Considerations

When deploying to production:

1. **Environment Variables**: Set `DATABASE_URL` in your hosting platform
2. **Database Migrations**: Run `npx prisma db push` in your build process  
3. **Connection Pooling**: Consider using connection pooling for high traffic
4. **SSL**: Use `sslmode=require` for secure connections

Your product data is now safely stored in PostgreSQL and ready for production scaling! 