import { PrismaClient } from '@prisma/client'

export async function seedFields(prisma: PrismaClient) {
  const fields = [
    { 
      id: 1,
      name: 'Soccer Field', 
      abbr: 'SCR-FLD',
      note: 'Standard soccer/football pitch',
      isActive: true,
      sportIds: [1],  // ✅ FIXED property name
      countryId: 1,
      ord: 1
    },
    { 
      id: 2,
      name: 'Basketball Court', 
      abbr: 'BSK-CRT',
      note: 'Indoor or outdoor basketball court',
      isActive: true,
      sportIds: [2],  // ✅ FIXED property name
      countryId: 1,
      ord: 2
    },
    { 
      id: 3,
      name: 'Football Field', 
      abbr: 'FTB-FLD',
      note: 'American football stadium or field',
      isActive: true,
      sportIds: [3],  // ✅ FIXED property name
      countryId: 1,
      ord: 3
    },
    { 
      id: 4,
      name: 'Hockey Rink', 
      abbr: 'HCK-RNK',
      note: 'Ice hockey or field hockey playing surface',
      isActive: true,
      sportIds: [4],  // ✅ FIXED property name
      countryId: 2,
      ord: 4
    }
  ]

  for (const field of fields) {
    const existingField = await prisma.baseField.findUnique({
      where: { id: field.id },
    })

    if (existingField) {
      await prisma.baseField.update({
        where: { id: field.id },
        data: field,
      })
    } else {
      await prisma.baseField.create({
        data: {...field, updatedAt: new Date()},
      })
    }
  }

  console.log('Fields seeding completed')
}

export default seedFields
