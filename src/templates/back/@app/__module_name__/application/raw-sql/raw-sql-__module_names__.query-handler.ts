import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { {{ toPascalCase schema.moduleName }}Response } from '../../domain/{{ toKebabCase schema.moduleName }}.response';
import { {{ toPascalCase schema.moduleName }}Mapper } from '../../domain/{{ toKebabCase schema.moduleName }}.mapper';
import { RawSQL{{ toPascalCase schema.moduleNames }}Query } from './raw-sql-{{ toKebabCase schema.moduleNames }}.query';
import { RawSQL{{ toPascalCase schema.moduleNames }}Service } from './raw-sql-{{ toKebabCase schema.moduleNames }}.service';

@QueryHandler(RawSQL{{ toPascalCase schema.moduleNames }}Query)
export class RawSQL{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<RawSQL{{ toPascalCase schema.moduleNames }}Query>
{
    private readonly mapper: {{ toPascalCase schema.moduleName }}Mapper = new {{ toPascalCase schema.moduleName }}Mapper();

    constructor(
        private readonly rawSQL{{ toPascalCase schema.moduleNames }}Service: RawSQL{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: RawSQL{{ toPascalCase schema.moduleNames }}Query): Promise<{{ toPascalCase schema.moduleName }}Response[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQL{{ toPascalCase schema.moduleNames }}Service.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}