import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { IamRoleAccount } from './iam-role-account.aggregate';
import { IamRoleId } from './value-objects';

export abstract class IamIRoleAccountRepository implements IRepository<IamRoleAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamRoleAccount>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount | null>;

    // find a single record by id
    abstract findById(
        id: IamRoleId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount[]>;

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
        roleAccount: IamRoleAccount,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamRoleAccount) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: IamRoleAccount) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        rolesAccounts: IamRoleAccount[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamRoleAccount) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        permission: IamRoleAccount,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamRoleAccount) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        roleAccount: IamRoleAccount,
        options?: {
            updateOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamRoleAccount) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification elements already existing in the table
    abstract upsert(
        roleAccount: IamRoleAccount,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamRoleAccount) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: IamRoleId,
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