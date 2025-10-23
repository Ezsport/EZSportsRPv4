import { PrismaClient } from '@prisma/client'
import seedSports from './seeds/base-sports.seed'
import seedCountries from './seeds/base-countries.seed'
import seedFields from './seeds/base-fields.seed'

const prisma = new PrismaClient()

async function main() {
  await seedSports(prisma)
  await seedCountries(prisma)
  await seedFields(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
