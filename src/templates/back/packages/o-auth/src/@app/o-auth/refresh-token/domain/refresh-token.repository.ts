
import { LiteralObject } from '@nestjs/common';
import { CQMetadata, IRepository, Pagination, QueryStatement } from '@aurora-ts/core';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenId } from './value-objects';

export abstract class IRefreshTokenRepository implements IRepository<OAuthRefreshToken>
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
        id: RefreshTokenId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
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
        id: RefreshTokenId,
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