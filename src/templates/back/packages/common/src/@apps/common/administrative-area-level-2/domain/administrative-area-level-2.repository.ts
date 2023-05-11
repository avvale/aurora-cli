
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel2 } from './administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Id } from './value-objects';

export abstract class IAdministrativeAreaLevel2Repository implements IRepository<CommonAdministrativeAreaLevel2>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonAdministrativeAreaLevel2>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel2 | null>;

    // find a single record by id
    abstract findById(
        id: AdministrativeAreaLevel2Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel2 | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel2[]>;

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
        administrativeAreaLevel2: CommonAdministrativeAreaLevel2,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel2) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: CommonAdministrativeAreaLevel2) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        administrativeAreasLevel2: CommonAdministrativeAreaLevel2[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel2) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        administrativeAreaLevel2: CommonAdministrativeAreaLevel2,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel2) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        administrativeAreaLevel2: CommonAdministrativeAreaLevel2,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel2) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AdministrativeAreaLevel2Id,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
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