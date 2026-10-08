import { Router, type Request, type Response } from 'express'
import { AuthUserModule } from '@/modules/shared/auth-user.express.module.js'
import { UserModule } from '@/modules/users/users.express.module.js'
import { ProductModule } from '@/modules/products/product.express.module.js'

export function GetRoutes(): Router {
  const router = Router()

  // const authUserModule = new AuthUserModule().execute()
  // const usersModule = new UserModule().execute()
  // const productModule = new ProductModule().execute()

  // router.use(authUserModule)
  // router.use('/users', usersModule)
  // router.use('/products', productModule)

  return router
}
