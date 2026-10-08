import type { USER_ROLES } from '@/lib/constants/user-roles'

export type AuthUserType = {
  guid: string
  role: USER_ROLES
}
