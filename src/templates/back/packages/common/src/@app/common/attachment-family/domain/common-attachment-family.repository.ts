import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { CommonAttachmentFamily } from './common-attachment-family.aggregate';
import { CommonAttachmentFamilyId } from './value-objects';

export abstract class CommonIAttachmentFamilyRepository implements IRepository<CommonAttachmentFamily>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonAttachmentFamily>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAttachmentFamily | null>;

    // find a single record by id
    abstract findById(
        id: CommonAttachmentFamilyId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<CommonAttachmentFamily | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAttachmentFamily[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAttachmentFamily[]>;

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
        attachmentFamily: CommonAttachmentFamily,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAttachmentFamily) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: CommonAttachmentFamily) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        attachmentFamilies: CommonAttachmentFamily[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAttachmentFamily) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        attachmentFamily: CommonAttachmentFamily,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAttachmentFamily) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        attachmentFamily: CommonAttachmentFamily,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAttachmentFamily) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        attachmentFamily: CommonAttachmentFamily,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonAttachmentFamily) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: CommonAttachmentFamilyId,
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
