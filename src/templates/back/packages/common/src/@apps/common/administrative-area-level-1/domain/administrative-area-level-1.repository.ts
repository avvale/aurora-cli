
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1 } from './administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Id } from './value-objects';

export abstract class IAdministrativeAreaLevel1Repository implements IRepository<CommonAdministrativeAreaLevel1>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonAdministrativeAreaLevel1>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel1 | null>;

    // find a single record by id
    abstract findById(
        id: AdministrativeAreaLevel1Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel1 | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel1[]>;

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
        administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel1) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: CommonAdministrativeAreaLevel1) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        administrativeAreasLevel1: CommonAdministrativeAreaLevel1[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel1) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel1) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel1) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AdministrativeAreaLevel1Id,
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