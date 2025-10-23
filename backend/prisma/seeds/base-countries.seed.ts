import { PrismaClient } from '@prisma/client'

export async function seedCountries(prisma: PrismaClient) {
  const countries = [
    { 
      id: 1,
      name: 'United States', 
      abbr: 'USA',
      code: 'US',
      note: 'United States of America',
      isActive: true,
      ord: 1
    },
    { 
      id: 2,
      name: 'Canada', 
      abbr: 'CAN',
      code: 'CA',
      note: 'Canada',
      isActive: true,
      ord: 2
    },
    { 
      id: 3,
      name: 'United Kingdom', 
      abbr: 'UK',
      code: 'GB',
      note: 'United Kingdom of Great Britain and Northern Ireland',
      isActive: true,
      ord: 3
    },
    { 
      id: 4,
      name: 'Australia', 
      abbr: 'AUS',
      code: 'AU',
      note: 'Commonwealth of Australia',
      isActive: true,
      ord: 4
    }
  ]

  for (const country of countries) {
    // First, try to find by id
    const existingCountry = await prisma.baseCountry.findUnique({
      where: { id: country.id }
    })

    if (existingCountry) {
      // If exists, update 
      await prisma.baseCountry.update({
        where: { id: country.id },
        data: country
      })
    } else {
      // If not exists, create with specified ID
      await prisma.baseCountry.create({
        data: country
      })
    }
  }

  console.log('Countries seeding completed')
}

export default seedCountries
