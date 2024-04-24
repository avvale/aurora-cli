import { WhatsappTimelineId } from './value-objects';
import { WhatsappTimeline } from '@app/whatsapp/timeline';
import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';

export abstract class WhatsappITimelineRepository implements IRepository<WhatsappTimeline>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<WhatsappTimeline>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<WhatsappTimeline | null>;

    // find a single record by id
    abstract findById(
        id: WhatsappTimelineId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<WhatsappTimeline | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<WhatsappTimeline[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<WhatsappTimeline[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // max record
    abstract max(
        column: string,
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // min record
    abstract min(
        column: string,
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // sum record
    abstract sum(
        column: string,
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
        timeline: WhatsappTimeline,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: WhatsappTimeline) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        timelines: WhatsappTimeline[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        timeline: WhatsappTimeline,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        timeline: WhatsappTimeline,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
        }
    ): Promise<void>;

    // update and increment records
    abstract updateAndIncrement(
        timeline: WhatsappTimeline,
        options?: {
            updateAndIncrementOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        timeline: WhatsappTimeline,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: WhatsappTimeline) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: WhatsappTimelineId,
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
