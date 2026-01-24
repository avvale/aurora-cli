/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextDto,
  IamFindBoundedContextByIdHandler,
} from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/find')
@Auth('iam.boundedContext.get')
export class IamFindBoundedContextByIdController {
  constructor(private readonly handler: IamFindBoundedContextByIdHandler) {}

  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Find bounded-context by id' })
  @ApiOkResponse({
    description: 'The record has been successfully requested.',
    type: IamBoundedContextDto,
  })
  async main(
    @Param('id') id: string,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(id, constraint, timezone);
  }
}
