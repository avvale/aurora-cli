import { QueueManagerQueueId } from './value-objects';
import { QueueManagerQueue } from '@app/queue-manager/queue';
import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';

export abstract class QueueManagerIQueueRepository implements IRepository<QueueManagerQueue>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<QueueManagerQueue>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerQueue | null>;

    // find a single record by id
    abstract findById(
        id: QueueManagerQueueId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<QueueManagerQueue | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerQueue[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<QueueManagerQueue[]>;

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
        queue: QueueManagerQueue,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerQueue) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: QueueManagerQueue) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        queues: QueueManagerQueue[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerQueue) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        queue: QueueManagerQueue,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: QueueManagerQueue) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        queue: QueueManagerQueue,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: QueueManagerQueue) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        queue: QueueManagerQueue,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: QueueManagerQueue) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: QueueManagerQueueId,
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
