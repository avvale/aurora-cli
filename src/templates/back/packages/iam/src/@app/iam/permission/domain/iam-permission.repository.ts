import { IamPermissionId } from './value-objects';
import { IamPermission } from '@app/iam/permission';
import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';

export abstract class IamIPermissionRepository implements IRepository<IamPermission>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamPermission>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermission | null>;

    // find a single record by id
    abstract findById(
        id: IamPermissionId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<IamPermission | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermission[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermission[]>;

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
        permission: IamPermission,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamPermission) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        permissions: IamPermission[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        permission: IamPermission,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        permission: IamPermission,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
        }
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        permission: IamPermission,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        permission: IamPermission,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermission) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: IamPermissionId,
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
