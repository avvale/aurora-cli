import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel3 } from './common-administrative-area-level-3.aggregate';
import { CommonAdministrativeAreaLevel3Id } from './value-objects';

export abstract class CommonIAdministrativeAreaLevel3Repository implements IRepository<CommonAdministrativeAreaLevel3>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonAdministrativeAreaLevel3>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3 | null>;

    // find a single record by id
    abstract findById(
        id: CommonAdministrativeAreaLevel3Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<CommonAdministrativeAreaLevel3 | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3[]>;

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
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: CommonAdministrativeAreaLevel3) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        administrativeAreasLevel3: CommonAdministrativeAreaLevel3[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: CommonAdministrativeAreaLevel3Id,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}
