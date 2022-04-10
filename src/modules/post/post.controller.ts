import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { PostModel } from './post.model'
import { HTTPDecorators } from '~/common/decorator/http.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { PagerDto } from '~/shared/dto/pager.dto'
import { BusinessException } from '~/common/exceptions/business.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'

@Controller('posts')
@ApiName
export class PostController {
  constructor(private readonly service: PostService) {}

  @HTTPDecorators.Paginator
  @Get('/')
  async gets(@Query() query: PagerDto) {
    const { page, select, size } = query
    return this.service.model.paginate(
      {},
      {
        page,
        limit: size,
        select,
        lean: true,
      },
    )
  }

  @Post('/')
  async create(@Body() body: PostModel) {
    return this.service.create(body)
  }

  @Get('/*')
  async notFound() {
    throw new BusinessException(ErrorCodeEnum.PostNotFoundError)
  }
}
