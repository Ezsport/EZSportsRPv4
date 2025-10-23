import { PrismaClient } from '@prisma/client'

export async function seedSports(prisma: PrismaClient) {
  const sports = [
    { 
      id: 1,
      name: 'Soccer', 
      abbr: 'SCR',
      note: 'Association football',
      isActive: true,
      order: 1
    },
    { 
      id: 2,
      name: 'Basketball', 
      abbr: 'BSK',
      note: 'Indoor basketball',
      isActive: true,
      order: 2
    },
    { 
      id: 3,
      name: 'American Football', 
      abbr: 'FTB',
      note: 'Gridiron football',
      isActive: true,
      order: 3
    },
    { 
      id: 4,
      name: 'Hockey', 
      abbr: 'HCK',
      note: 'Ice hockey or field hockey',
      isActive: true,
      order: 4
    },
    { 
      id: 5,
      name: 'Baseball', 
      abbr: 'BSB',
      note: 'North American baseball',
      isActive: true,
      order: 5
    }
  ]

  for (const sport of sports) {
    // First, try to find by id
    const existingSport = await prisma.baseSport.findUnique({
      where: { id: sport.id }
    })

    if (existingSport) {
      // If exists, update 
      await prisma.baseSport.update({
        where: { id: sport.id },
        data: sport
      })
    } else {
      // If not exists, create 
      await prisma.baseSport.create({
        data: sport
      })
    }
  }

  console.log('Sports seeding completed')
}

export default seedSports
