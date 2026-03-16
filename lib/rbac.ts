import { Role } from "@prisma/client"

export const RoleHierarchy: Record<Role, number> = {
  PARENT: 1,
  STUDENT: 1,
  TEACHER: 2,
  FINANCE: 3,
  SCHOOL_ADMIN: 4,
  SUPER_ADMIN: 5
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole];
}

export const ROUTES_BY_ROLE: Record<string, Role[]> = {
  "/admin": ["SUPER_ADMIN"],
  "/dashboard": ["SUPER_ADMIN", "SCHOOL_ADMIN", "FINANCE", "TEACHER", "STUDENT", "PARENT"],
  "/dashboard/admin": ["SUPER_ADMIN", "SCHOOL_ADMIN"],
  "/dashboard/finance": ["SUPER_ADMIN", "SCHOOL_ADMIN", "FINANCE"],
  "/dashboard/teacher": ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER"],
  "/dashboard/student": ["STUDENT", "PARENT"],
}
