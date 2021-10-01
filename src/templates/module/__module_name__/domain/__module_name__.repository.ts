
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { {{ schema.aggregateName }} } from './{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Id } from './value-objects';

export abstract class I{{ toPascalCase schema.moduleName }}Repository implements IRepository<{{ schema.aggregateName }}>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<{{ schema.aggregateName }}>>;

    // create a single record
    abstract create({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}): Promise<void>;

    // create a single or multiple records
    abstract insert({{ toCamelCase schema.moduleNames }}: {{ schema.aggregateName }}[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<{{ schema.aggregateName }} | null>;

    // find a single record by id
    abstract findById(id: {{ toPascalCase schema.moduleName }}Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<{{ schema.aggregateName }} | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<{{ schema.aggregateName }}[]>;

    // update record
    abstract update({{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }}, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: {{ toPascalCase schema.moduleName }}Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}