import { Injectable } from '@nestjs/common';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class RawSQL{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<{{ schema.aggregateName }}[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}