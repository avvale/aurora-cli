import { ToolsKeyValue, ToolsUpdateKeyValueByIdInput } from '@api/graphql';
import { ToolsUpdateKeyValueByIdHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import {
  Auditing,
  AuditingMeta,
  QueryStatement,
  Timezone,
} from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.update')
export class ToolsUpdateKeyValueByIdResolver {
  constructor(private readonly handler: ToolsUpdateKeyValueByIdHandler) {}

  @Mutation('toolsUpdateKeyValueById')
  async main(
    @Args('payload') payload: ToolsUpdateKeyValueByIdInput,
    @Args('constraint') constraint?: QueryStatement,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<ToolsKeyValue> {
    return await this.handler.main(payload, constraint, timezone, auditing);
  }
}
