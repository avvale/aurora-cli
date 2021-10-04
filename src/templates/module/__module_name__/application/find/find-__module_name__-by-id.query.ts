import { QueryStatement } from '{{ config.applicationsContainer }}/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '{{ config.applicationsContainer }}/shared/domain/lib/hades.types';

export class Find{{ toPascalCase schema.moduleName }}ByIdQuery
{
    constructor(
        public readonly id: string,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}