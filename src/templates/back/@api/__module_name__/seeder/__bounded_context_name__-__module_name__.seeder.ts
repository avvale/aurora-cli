import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { Create{{ toPascalCase schema.moduleNames }}Command } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/application/create/create-{{ toKebabCase schema.moduleNames }}.command';
import { {{ toCamelCase schema.moduleNames }} } from '{{ config.appContainer }}/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/infrastructure/mock/mock-{{ toKebabCase schema.moduleName }}.data';

@Injectable()
export class {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Seeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new Create{{ toPascalCase schema.moduleNames }}Command(
            {{ toCamelCase schema.moduleNames }},
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}