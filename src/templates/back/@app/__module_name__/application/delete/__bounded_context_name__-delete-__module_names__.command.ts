import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class {{ toPascalCase schema.boundedContextName }}Delete{{ toPascalCase schema.moduleNames }}Command
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
