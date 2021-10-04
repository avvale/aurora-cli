import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '{{ config.applicationsContainer }}/shared/domain/lib/pagination.response';
import { Paginate{{ toPascalCase schema.moduleNames }}Query } from './paginate-{{ toKebabCase schema.moduleNames }}.query';
import { Paginate{{ toPascalCase schema.moduleNames }}Service } from './paginate-{{ toKebabCase schema.moduleNames }}.service';

@QueryHandler(Paginate{{ toPascalCase schema.moduleNames }}Query)
export class Paginate{{ toPascalCase schema.moduleNames }}QueryHandler implements IQueryHandler<Paginate{{ toPascalCase schema.moduleNames }}Query>
{
    constructor(
        private readonly paginate{{ toPascalCase schema.moduleNames }}Service: Paginate{{ toPascalCase schema.moduleNames }}Service,
    ) {}

    async execute(query: Paginate{{ toPascalCase schema.moduleNames }}Query): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginate{{ toPascalCase schema.moduleNames }}Service.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}