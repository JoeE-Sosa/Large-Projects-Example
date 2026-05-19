import type { AuthUserType } from '@/modules/shared/domain/types/auth.type.ts'

export interface AuthEndpointDTO {
  minRole: string
  user: AuthUserType
}
