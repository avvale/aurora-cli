import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.query';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}.service';

@QueryHandler({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query)
export class {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}QueryHandler implements IQueryHandler<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query>
{
    private readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly find{{ toPascalCase schema.moduleName }}Service: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(query: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}Query): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response>
    {
        const {{ toCamelCase schema.moduleName }} = await this.find{{ toPascalCase schema.moduleName }}Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse({{ toCamelCase schema.moduleName }});
    }
}
