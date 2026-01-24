/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextDto,
  IamCreateBoundedContextDto,
  IamCreateBoundedContextsHandler,
} from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/create')
@Auth('iam.boundedContext.create')
export class IamCreateBoundedContextsController {
  constructor(private readonly handler: IamCreateBoundedContextsHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create bounded-contexts in batch' })
  @ApiCreatedResponse({
    description: 'The records has been created successfully.',
    type: [IamBoundedContextDto],
  })
  @ApiBody({ type: [IamCreateBoundedContextDto] })
  async main(
    @Body() payload: IamCreateBoundedContextDto[],
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
