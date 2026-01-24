/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContextDto,
  IamCreateBoundedContextDto,
  IamCreateBoundedContextHandler,
} from '@api/iam/bounded-context';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/create')
@Auth('iam.boundedContext.create')
export class IamCreateBoundedContextController {
  constructor(private readonly handler: IamCreateBoundedContextHandler) {}

  @Post()
  @ApiOperation({ summary: 'Create bounded-context' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: IamBoundedContextDto,
  })
  async main(
    @Body() payload: IamCreateBoundedContextDto,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ) {
    return await this.handler.main(payload, timezone, auditing);
  }
}
