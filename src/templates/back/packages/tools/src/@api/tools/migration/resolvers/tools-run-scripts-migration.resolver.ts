import { ToolsRunScriptsMigrationHandler } from '@api/tools/migration';
import { Auth } from '@aurora/decorators';
import { Timezone } from '@aurorajs.dev/core';
import { Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('tools.migration.update')
export class ToolsRunScriptsMigrationResolver {
    constructor(private readonly handler: ToolsRunScriptsMigrationHandler) {}

    @Mutation('toolsRunScriptsMigration')
    async main(@Timezone() timezone?: string): Promise<boolean> {
        return await this.handler.main(timezone);
    }
}
