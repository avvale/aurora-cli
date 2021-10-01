import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.moduleName }}Response } from './../../domain/{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.moduleName }}Mapper } from './../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { {{ toPascalCase schema.moduleName }}Id } from './../../domain/value-objects';
import { Find{{ toPascalCase schema.moduleName }}ByIdQuery } from './find-{{ toKebabCase schema.moduleName }}-by-id.query';
import { Find{{ toPascalCase schema.moduleName }}ByIdService } from './find-{{ toKebabCase schema.moduleName }}-by-id.service';

@QueryHandler(Find{{ toPascalCase schema.moduleName }}ByIdQuery)
export class Find{{ toPascalCase schema.moduleName }}ByIdQueryHandler implements IQueryHandler<Find{{ toPascalCase schema.moduleName }}ByIdQuery>
{
    private readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly find{{ toPascalCase schema.moduleName }}ByIdService: Find{{ toPascalCase schema.moduleName }}ByIdService,
    ) {}

    async execute(query: Find{{ toPascalCase schema.moduleName }}ByIdQuery): Promise<{{ toPascalCase schema.moduleName }}Response>
    {
        const {{ toCamelCase schema.moduleName }} = await this.find{{ toPascalCase schema.moduleName }}ByIdService.main(
            new {{ toPascalCase schema.moduleName }}Id(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse({{ toCamelCase schema.moduleName }});
    }
}