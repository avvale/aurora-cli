import { Injectable } from '@nestjs/common';
import { QueryStatement } from '{{ config.applicationsContainer }}/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '{{ config.applicationsContainer }}/shared/domain/lib/hades.types';
import { Pagination } from '{{ config.applicationsContainer }}/shared/domain/lib/pagination';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class Paginate{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<{{ schema.aggregateName }}>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}