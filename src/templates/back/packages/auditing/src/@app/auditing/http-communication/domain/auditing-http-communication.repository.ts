import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { AuditingHttpCommunication } from './auditing-http-communication.aggregate';
import { AuditingHttpCommunicationId } from './value-objects';

export abstract class AuditingIHttpCommunicationRepository implements IRepository<AuditingHttpCommunication>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<AuditingHttpCommunication>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingHttpCommunication | null>;

    // find a single record by id
    abstract findById(
        id: AuditingHttpCommunicationId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingHttpCommunication | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingHttpCommunication[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<AuditingHttpCommunication[]>;

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
        httpCommunication: AuditingHttpCommunication,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingHttpCommunication) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: AuditingHttpCommunication) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        httpCommunications: AuditingHttpCommunication[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingHttpCommunication) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        httpCommunication: AuditingHttpCommunication,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AuditingHttpCommunication) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        httpCommunication: AuditingHttpCommunication,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: AuditingHttpCommunication) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        httpCommunication: AuditingHttpCommunication,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: AuditingHttpCommunication) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AuditingHttpCommunicationId,
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
