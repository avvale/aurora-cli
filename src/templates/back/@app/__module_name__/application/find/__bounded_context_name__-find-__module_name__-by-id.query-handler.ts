import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}.mapper';
import { {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService } from './{{ toKebabCase schema.boundedContextName }}-find-{{ toKebabCase schema.moduleName }}-by-id.service';

@QueryHandler({{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery)
export class {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler implements IQueryHandler<{{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery>
{
    private readonly mapper: {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly find{{ toPascalCase schema.moduleName }}ByIdService: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(query: {{ toPascalCase schema.boundedContextName }}Find{{ toPascalCase schema.moduleName }}ByIdQuery): Promise<{{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Response>
    {
        const {{ toCamelCase schema.moduleName }} = await this.find{{ toPascalCase schema.moduleName }}ByIdService.main(
            new {{ toPascalCase schema.boundedContextName }}{{ toPascalCase schema.moduleName }}Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse({{ toCamelCase schema.moduleName }});
    }
}
