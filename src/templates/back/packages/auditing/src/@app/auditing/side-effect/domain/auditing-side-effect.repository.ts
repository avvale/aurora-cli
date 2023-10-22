import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AuditingSideEffect } from './auditing-side-effect.aggregate';
import { AuditingSideEffectId } from './value-objects';

export abstract class AuditingISideEffectRepository implements IRepository<AuditingSideEffect>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AuditingSideEffect>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingSideEffect | null>;

    // find a single record by id
    abstract findById(
        id: AuditingSideEffectId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingSideEffect | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingSideEffect[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingSideEffect[]>;

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
        sideEffect: AuditingSideEffect,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingSideEffect) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AuditingSideEffect) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        sideEffects: AuditingSideEffect[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingSideEffect) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        sideEffect: AuditingSideEffect,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AuditingSideEffect) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        sideEffect: AuditingSideEffect,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AuditingSideEffect) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        sideEffect: AuditingSideEffect,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingSideEffect) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AuditingSideEffectId,
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
