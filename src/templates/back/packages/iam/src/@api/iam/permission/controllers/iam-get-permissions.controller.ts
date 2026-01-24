/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import {
  IamGetPermissionsHandler,
  IamPermissionDto,
} from '@api/iam/permission';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] permission')
@Controller('iam/permissions/get')
@Auth('iam.permission.get')
export class IamGetPermissionsController {
  constructor(private readonly handler: IamGetPermissionsHandler) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get permissions according to query' })
  @ApiOkResponse({
    description: 'The records has been found successfully.',
    type: [IamPermissionDto],
  })
  @ApiBody({ type: QueryStatement })
  @ApiQuery({ name: 'query', type: QueryStatement })
  async main(
    @Body('query') queryStatement?: QueryStatement,
    @Body('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
  ) {
    return await this.handler.main(queryStatement, constraint, timezone);
  }
}
