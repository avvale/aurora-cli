import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Id } from '../../domain/value-objects';

@Injectable()
export class Find{{ toPascalCase schema.moduleName }}ByIdService
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(
        id: {{ toPascalCase schema.moduleName }}Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<{{ schema.aggregateName }}>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}