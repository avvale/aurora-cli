
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { CommonLang } from './lang.aggregate';
import { LangId } from './value-objects';

export abstract class ILangRepository implements IRepository<CommonLang>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonLang>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonLang | null>;

    // find a single record by id
    abstract findById(
        id: LangId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonLang | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonLang[]>;

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
        lang: CommonLang,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonLang) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: CommonLang) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        langs: CommonLang[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonLang) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        lang: CommonLang,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonLang) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        lang: CommonLang,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonLang) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: LangId,
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