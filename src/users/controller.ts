import { JsonController, Get, Param, Body, Put, Post, Authorized, NotFoundError } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

  @Get('/users/:id')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOneById(id)
  }

  @Get('/users')
  async allUsers() {
    const users = await User.find()
    return { users }
  }

  @Authorized()
  @Put('/users/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ): User {
        const user = await User.findOneById(id)
        if (!user) throw new NotFoundError('Cannot find page')
        return User.merge(user, update).save()
    }

    @Post('/users')
    async createUser(
      @Body() user: User
    ) {
      const {password, ...rest} = user
      const entity = User.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }

}
