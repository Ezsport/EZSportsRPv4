const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function listTables() {
  try {
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `
    console.log('Tables in the database:')
    console.log(result)
  } catch (error) {
    console.error('Error listing tables:', error)
  } finally {
    await prisma.$disconnect()
  }
}

listTables()

