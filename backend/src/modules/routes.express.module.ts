import { Router, type Request, type Response } from 'express'
import { AuthUserModule } from './shared/auth-user.express.module.ts'
import { UserModule } from './users/users.express.module.ts'
import { ProductModule } from './products/product.express.module.ts'

export function GetRoutes(): Router {
  const router = Router()

  const authUserModule = new AuthUserModule().execute()
  const usersModule = new UserModule().execute()
  const productModule = new ProductModule().execute()

  router.get('/', (_: Request, res: Response) => {
    return res.status(200).send({ version: 'v1', server: 'express', description: 'API Server de Ejemplo V1.' })
  })

  router.use(authUserModule)
  router.use('/users', usersModule)
  router.use('/products', productModule)

  return router
}
