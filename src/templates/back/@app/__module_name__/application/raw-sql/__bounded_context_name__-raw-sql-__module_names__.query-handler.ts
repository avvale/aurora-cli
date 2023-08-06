import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query } from './{{ toKebabCase schema.boundedContextName }}-raw-sql-{{ toKebabCase schema.moduleNames }}.query';
import { {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service } from './{{ toKebabCase schema.boundedContextName }}-raw-sql-{{ toKebabCase schema.moduleNames }}.service';

@QueryHandler({{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query)
export class {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<{{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query>
{
    private readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly rawSQL{{ toPascalCase schema.moduleNames }}Service: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: {{ toPascalCase schema.boundedContextName }}RawSQL{{ toPascalCase schema.moduleNames }}Query): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQL{{ toPascalCase schema.moduleNames }}Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
