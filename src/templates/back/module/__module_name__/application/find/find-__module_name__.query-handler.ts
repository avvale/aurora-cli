import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { Find{{ toPascalCase schema.moduleName }}Query } from './find-{{ toKebabCase schema.moduleName }}.query';
import { Find{{ toPascalCase schema.moduleName }}Service } from './find-{{ toKebabCase schema.moduleName }}.service';

@QueryHandler(Find{{ toPascalCase schema.moduleName }}Query)
export class Find{{ toPascalCase schema.moduleName }}QueryHandler implements IQueryHandler<Find{{ toPascalCase schema.moduleName }}Query>
{
    private readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly find{{ toPascalCase schema.moduleName }}Service: Find{{ toPascalCase schema.moduleName }}Service,
    ) {}

    async execute(query: Find{{ toPascalCase schema.moduleName }}Query): Promise<{{ toPascalCase schema.moduleName }}Response>
    {
        const {{ toCamelCase schema.moduleName }} = await this.find{{ toPascalCase schema.moduleName }}Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse({{ toCamelCase schema.moduleName }});
    }
}