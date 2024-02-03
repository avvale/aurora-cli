import { IamPermissionRole } from '@app/iam/permission-role';
import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';

export abstract class IamIPermissionRoleRepository implements IRepository<IamPermissionRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamPermissionRole>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole | null>;

    // find a single record by id
    abstract findById(
        id: undefined,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<IamPermissionRole | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole[]>;

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
        permissionRole: IamPermissionRole,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamPermissionRole) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        permissionsRoles: IamPermissionRole[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        permissionRole: IamPermissionRole,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        permissionRole: IamPermissionRole,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
        }
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        permissionRole: IamPermissionRole,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        permissionRole: IamPermissionRole,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: undefined,
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
