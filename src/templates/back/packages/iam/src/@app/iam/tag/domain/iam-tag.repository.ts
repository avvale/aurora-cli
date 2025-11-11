import { IamTag } from '@app/iam/tag';
import {
    CQMetadata,
    IRepository,
    LiteralObject,
    Pagination,
    QueryStatement,
} from '@aurorajs.dev/core';
import { IamTagId } from './value-objects';

export abstract class IamITagRepository implements IRepository<IamTag> {
    abstract readonly repository: any;

    // paginate records
    abstract paginate(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<Pagination<IamTag>>;

    // find a single record
    abstract find(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<IamTag | null>;

    // find a single record by id
    abstract findById(
        id: IamTagId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        },
    ): Promise<IamTag | null>;

    // get multiple records
    abstract get(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<IamTag[]>;

    // get records with rawSQL
    abstract rawSQL(options?: {
        rawSQL?: string;
        cQMetadata?: CQMetadata;
    }): Promise<IamTag[]>;

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
        tag: IamTag,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamTag) => QueryStatement;
        },
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        tags: IamTag[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
        },
    ): Promise<void>;

    // update record by id
    abstract updateById(
        tag: IamTag,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        },
    ): Promise<void>;

    // update records
    abstract update(
        tag: IamTag,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
        },
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        tag: IamTag,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
        },
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        tag: IamTag,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: IamTag) => LiteralObject;
        },
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: IamTagId,
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
