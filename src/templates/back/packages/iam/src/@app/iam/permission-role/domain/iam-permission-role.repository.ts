import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { IamPermissionRole } from '@app/iam/permission-role';

// ---- customizations ----
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';

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
        id: IamPermissionId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
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
        permission: IamPermissionRole,
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
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification elements already existing in the table
    abstract upsert(
        permissionRole: IamPermissionRole,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamPermissionRole) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: IamPermissionId,
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