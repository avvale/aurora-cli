import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { Get{{ toPascalCase schema.moduleNames }}Query } from './get-{{ toKebabCase schema.moduleNames }}.query';
import { Get{{ toPascalCase schema.moduleNames }}Service } from './get-{{ toKebabCase schema.moduleNames }}.service';

@QueryHandler(Get{{ toPascalCase schema.moduleNames }}Query)
export class Get{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<Get{{ toPascalCase schema.moduleNames }}Query>
{
    private readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly get{{ toPascalCase schema.moduleNames }}Service: Get{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: Get{{ toPascalCase schema.moduleNames }}Query): Promise<{{ toPascalCase schema.moduleName }}Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.get{{ toPascalCase schema.moduleNames }}Service.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}