
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from '{{ config.auroraCorePackage }}';
import { {{ schema.aggregateName }} } from './{{ toKebabCase schema.moduleName }}.aggregate';
import { {{ toPascalCase schema.moduleName }}Id } from './value-objects';

export abstract class I{{ toPascalCase schema.moduleName }}Repository implements IRepository<{{ schema.aggregateName }}>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<{{ schema.aggregateName }}>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ schema.aggregateName }} | null>;

    // find a single record by id
    abstract findById(
        id: {{ toPascalCase schema.moduleName }}Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ schema.aggregateName }} | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<{{ schema.aggregateName }}[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        {{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }},
        options?: {
            dataFactory?: (aggregate: {{ schema.aggregateName }}) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: {{ schema.aggregateName }}) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        {{ toCamelCase schema.moduleNames }}: {{ schema.aggregateName }}[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: {{ schema.aggregateName }}) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        {{ toCamelCase schema.moduleName }}: {{ schema.aggregateName }},
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: {{ schema.aggregateName }}) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: {{ toPascalCase schema.moduleName }}Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}