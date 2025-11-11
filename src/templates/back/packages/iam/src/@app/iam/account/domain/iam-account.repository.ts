import { IamAccount } from '@app/iam/account';
import {
    CQMetadata,
    IRepository,
    LiteralObject,
    Pagination,
    QueryStatement,
} from '@aurorajs.dev/core';
import { IamAccountId } from './value-objects';

export abstract class IamIAccountRepository implements IRepository<IamAccount> {
    abstract readonly repository: any;

    // paginate records
    abstract paginate(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<Pagination<IamAccount>>;

    // find a single record
    abstract find(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<IamAccount | null>;

    // find a single record by id
    abstract findById(
        id: IamAccountId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        },
    ): Promise<IamAccount | null>;

    // get multiple records
    abstract get(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<IamAccount[]>;

    // get records with rawSQL
    abstract rawSQL(options?: {
        rawSQL?: string;
        cQMetadata?: CQMetadata;
    }): Promise<IamAccount[]>;

    // count records
    abstract count(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<number>;

    // max record
    abstract max(
        column: string,
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        },
    ): Promise<number>;

    // min record
    abstract min(
        column: string,
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        },
    ): Promise<number>;

    // sum record
    abstract sum(
        column: string,
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        },
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
        },
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        accounts: IamAccount[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        },
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
        },
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
        },
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        account: IamAccount,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        },
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        account: IamAccount,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamAccount) => LiteralObject;
        },
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: IamAccountId,
        options?: {
            deleteOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        },
    ): Promise<void>;

    // delete records
    abstract delete(options?: {
        deleteOptions?: LiteralObject;
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<void>;
}
