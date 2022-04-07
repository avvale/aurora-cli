import { Injectable } from '@nestjs/common';
import { QueryStatement } from '{{ config.auroraCorePackage }}';
import { Pagination } from '{{ config.auroraCorePackage }}';
import { CQMetadata } from '{{ config.auroraCorePackage }}';
import { I{{ toPascalCase schema.moduleName }}Repository } from './../../domain/{{ toKebabCase schema.moduleName }}.repository';
import { {{ schema.aggregateName }} } from './../../domain/{{ toKebabCase schema.moduleName }}.aggregate';

@Injectable()
export class Paginate{{ toPascalCase schema.moduleNames }}Service
{
    constructor(
        private readonly repository: I{{ toPascalCase schema.moduleName }}Repository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<{{ schema.aggregateName }}>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}