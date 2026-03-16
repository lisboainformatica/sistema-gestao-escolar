import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  console.log('Seeding database...')

  const superAdminEmail = 'admin@platform.com'
  const existingAdmin = await prisma.user.findUnique({ where: { email: superAdminEmail } })

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10)
    await prisma.user.create({
      data: {
        name: 'Super Administrator',
        email: superAdminEmail,
        passwordHash,
        role: Role.SUPER_ADMIN,
      },
    })
    console.log('Created super admin: admin@platform.com / admin123')
  } else {
    console.log('Super admin already exists.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
