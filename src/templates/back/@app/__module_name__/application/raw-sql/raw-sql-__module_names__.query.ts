import { CQMetadata } from '{{ config.auroraCorePackage }}';

export class RawSQL{{ toPascalCase schema.moduleNames }}Query
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}