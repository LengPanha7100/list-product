#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Prisma with PostgreSQL database...\n');

// Helper function to run commands with better error handling
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ ${description} failed:`, error.message);
        if (stderr) console.error('Error details:', stderr);
        reject(error);
        return;
      }
      if (stdout) console.log(stdout);
      if (stderr && !error) console.warn('Warnings:', stderr);
      console.log(`✅ ${description} completed\n`);
      resolve(stdout);
    });
  });
}

async function setupDatabase() {
  try {
    // Check if .env file exists
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      console.log('❌ .env file not found!');
      console.log('\n📝 Please create a .env file in your project root with your PostgreSQL connection:');
      console.log('');
      console.log('DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"');
      console.log('');
      console.log('Replace with your actual PostgreSQL connection details:');
      console.log('- username: your PostgreSQL username');
      console.log('- password: your PostgreSQL password');
      console.log('- localhost:5432: your PostgreSQL host and port');
      console.log('- database_name: your database name');
      console.log('');
      console.log('Example for local PostgreSQL:');
      console.log('DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/list_products?schema=public"');
      console.log('');
      return process.exit(1);
    }

    // Check Prisma installation
    await runCommand('npx prisma --version', '1. Checking Prisma installation');

    // Test database connection by trying to introspect
    console.log('2. Testing database connection...');
    try {
      await runCommand('npx prisma db pull --force', 'Testing database connection');
      console.log('✅ Database connection successful and schema pulled\n');
    } catch (error) {
      console.log('⚠️  Database connection test - continuing anyway\n');
    }

    // Generate Prisma client
    await runCommand('npx prisma generate', '3. Generating Prisma client');

    // Push schema to database
    await runCommand('npx prisma db push', '4. Updating database schema');

    console.log('\n🎉 PostgreSQL database setup completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. View your database: npx prisma studio');
    console.log('3. Add some products through the web interface');
    console.log('\n📊 Your PostgreSQL database is now connected and ready to use!');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify your .env file exists with correct DATABASE_URL');
    console.log('2. Make sure PostgreSQL is running and accessible');
    console.log('3. Check your database credentials and permissions');
    console.log('4. Ensure the database exists (create it if needed)');
    console.log('5. Try connecting to your database directly first');
    console.log('\n📋 Your .env file should look like:');
    console.log('DATABASE_URL="postgresql://username:password@host:5432/database?schema=public"');
    process.exit(1);
  }
}

// Run the setup
setupDatabase(); 