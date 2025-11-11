import { ToolsProcedure } from '@app/tools/procedure';
import {
    CQMetadata,
    IRepository,
    LiteralObject,
    Pagination,
    QueryStatement,
} from '@aurorajs.dev/core';
import { ToolsProcedureId } from './value-objects';

export abstract class ToolsIProcedureRepository
    implements IRepository<ToolsProcedure>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<Pagination<ToolsProcedure>>;

    // find a single record
    abstract find(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsProcedure | null>;

    // find a single record by id
    abstract findById(
        id: ToolsProcedureId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        },
    ): Promise<ToolsProcedure | null>;

    // get multiple records
    abstract get(options?: {
        queryStatement?: QueryStatement;
        constraint?: QueryStatement;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsProcedure[]>;

    // get records with rawSQL
    abstract rawSQL(options?: {
        rawSQL?: string;
        cQMetadata?: CQMetadata;
    }): Promise<ToolsProcedure[]>;

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
        procedure: ToolsProcedure,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (
                aggregate: ToolsProcedure,
            ) => QueryStatement;
        },
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        procedures: ToolsProcedure[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
        },
    ): Promise<void>;

    // update record by id
    abstract updateById(
        procedure: ToolsProcedure,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        },
    ): Promise<void>;

    // update records
    abstract update(
        procedure: ToolsProcedure,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
        },
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        procedure: ToolsProcedure,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
        },
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        procedure: ToolsProcedure,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: ToolsProcedure) => LiteralObject;
        },
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: ToolsProcedureId,
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
