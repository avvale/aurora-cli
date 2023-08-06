import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
// import { CreatePermissionsCommand } from '{{ config.appContainer }}/iam/permission/application/create/create-permissions.command';
// import { CreateBoundedContextsCommand } from '{{ config.appContainer }}/iam/bounded-context/application/create/create-bounded-contexts.command';
import { boundedContexts, permissions } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.boundedContextName }}.seed';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}Seeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        // await this.commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
        // await this.commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

        return true;
    }
}
