import { UserRepository } from "@/repositories/UserRepository"
import { CreateUserInput, createUserSchema } from "@/schemas/user.schema"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser(input: CreateUserInput) {
    // Validate input
    const validatedData = createUserSchema.parse(input)

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(validatedData.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 10)

    // Create user
    return this.userRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      passwordHash,
      role: validatedData.role || Role.STUDENT,
      school: validatedData.schoolId ? { connect: { id: validatedData.schoolId } } : undefined,
    })
  }

  async getUser(id: string) {
    return this.userRepository.findById(id)
  }

  async getUsersBySchool(schoolId: string) {
    return this.userRepository.findBySchool(schoolId)
  }
}
