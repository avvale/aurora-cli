import { ToolsCreateKeyValueInput, ToolsKeyValue } from '@api/graphql';
import { ToolsCreateKeyValueHandler } from '@api/tools/key-value';
import { Auth } from '@aurora/decorators';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.keyValue.create')
export class ToolsCreateKeyValueResolver {
  constructor(private readonly handler: ToolsCreateKeyValueHandler) {}

  @Mutation('toolsCreateKeyValue')
  async main(
    @Args('payload') payload: ToolsCreateKeyValueInput,
    @Timezone() timezone?: string,
    @Auditing() auditing?: AuditingMeta,
  ): Promise<ToolsKeyValue> {
    return await this.handler.main(payload, timezone, auditing);
  }
}
