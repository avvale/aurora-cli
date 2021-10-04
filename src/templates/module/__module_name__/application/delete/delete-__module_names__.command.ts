import { QueryStatement } from '{{ config.applicationsContainer }}/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '{{ config.applicationsContainer }}/shared/domain/lib/hades.types';

export class Delete{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}