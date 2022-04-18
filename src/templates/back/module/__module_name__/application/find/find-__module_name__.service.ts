import { Injectable } from '@nestjs/common';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from '../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from '../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class Find{{ toPascalCase schema.moduleName }}Service
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<{{ schema.aggregateName }}>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}