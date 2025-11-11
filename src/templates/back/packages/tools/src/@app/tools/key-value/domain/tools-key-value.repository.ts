import { ToolsKeyValue } from '@app/tools/key-value';
import {
    CQMetadata,
    IRepository,
    LiteralObject,
    Pagination,
    QueryStatement,
} from '@aurorajs.dev/core';
import { ToolsKeyValueId } from './value-objects';

export abstract class ToolsIKeyValueRepository
    implements IRepository<ToolsKeyValue>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<Pagination<ToolsKeyValue>>;

    // find a single record
    abstract find(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsKeyValue | null>;

    // find a single record by id
    abstract findById(
        id: ToolsKeyValueId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        },
    ): Promise<ToolsKeyValue | null>;

    // get multiple records
    abstract get(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsKeyValue[]>;

    // get records with rawSQL
    abstract rawSQL(options?: {
        rawSQL?: string;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsKeyValue[]>;

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
        keyValue: ToolsKeyValue,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: ToolsKeyValue) => QueryStatement;
        },
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        keyValues: ToolsKeyValue[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
        },
    ): Promise<void>;

    // update record by id
    abstract updateById(
        keyValue: ToolsKeyValue,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        },
    ): Promise<void>;

    // update records
    abstract update(
        keyValue: ToolsKeyValue,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
        },
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        keyValue: ToolsKeyValue,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
        },
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        keyValue: ToolsKeyValue,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsKeyValue) => LiteralObject;
        },
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: ToolsKeyValueId,
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
