import { OAuthRefreshTokenId } from './value-objects';
import { OAuthRefreshToken } from '@app/o-auth/refresh-token';
import { CQMetadata, IRepository, LiteralObject, Pagination, QueryStatement } from '@aurorajs.dev/core';

export abstract class OAuthIRefreshTokenRepository implements IRepository<OAuthRefreshToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<OAuthRefreshToken>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken | null>;

    // find a single record by id
    abstract findById(
        id: OAuthRefreshTokenId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
            findArguments?: LiteralObject;
        }
    ): Promise<OAuthRefreshToken | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken[]>;

    // get records with rawSQL
    abstract rawSQL(
        options?: {
            rawSQL?: string;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken[]>;

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
        refreshToken: OAuthRefreshToken,
        options?: {
            createOptions?: LiteralObject;
            dataFactory?: (aggregate: OAuthRefreshToken) => LiteralObject;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: OAuthRefreshToken) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        refreshTokens: OAuthRefreshToken[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: OAuthRefreshToken) => LiteralObject;
        }
    ): Promise<void>;

    // update record by id
    abstract updateById(
        refreshToken: OAuthRefreshToken,
        options?: {
            updateByIdOptions?: LiteralObject;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthRefreshToken) => LiteralObject;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // update records
    abstract update(
        refreshToken: OAuthRefreshToken,
        options?: {
            updateOptions?: LiteralObject;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthRefreshToken) => LiteralObject;
        }
    ): Promise<void>;

    // insert or update key identification element already existing in the table
    abstract upsert(
        refreshToken: OAuthRefreshToken,
        options?: {
            upsertOptions?: LiteralObject;
            dataFactory?: (aggregate: OAuthRefreshToken) => LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: OAuthRefreshTokenId,
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
