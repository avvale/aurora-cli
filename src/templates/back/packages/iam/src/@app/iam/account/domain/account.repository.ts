
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurora-ts/core';
import { IamAccount } from './account.aggregate';
import { AccountId } from './value-objects';

export abstract class IAccountRepository implements IRepository<IamAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamAccount>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount | null>;

    // find a single record by id
    abstract findById(
        id: AccountId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount[]>;

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
        account: IamAccount,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamAccount) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        accounts: IamAccount[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        account: IamAccount,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        account: IamAccount,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        account: IamAccount,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AccountId,
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