import type { USER_ROLES } from '@/constants/user-roles.ts'

export type AuthUserType = {
  guid: string
  role: USER_ROLES
}
