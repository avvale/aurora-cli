/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamBoundedContext } from '@app/iam/bounded-context';
import {
  CQMetadata,
  IRepository,
  LiteralObject,
  Pagination,
  QueryStatement,
} from '@aurorajs.dev/core';
import { IamBoundedContextId } from './value-objects';

export abstract class IamIBoundedContextRepository
  implements IRepository<IamBoundedContext>
{
  abstract readonly repository: any;

  // paginate records
  abstract paginate(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<Pagination<IamBoundedContext>>;

  // find a single record
  abstract find(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<IamBoundedContext | null>;

  // find a single record by id
  abstract findById(
    id: IamBoundedContextId,
    options?: {
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
      findArguments?: LiteralObject;
    },
  ): Promise<IamBoundedContext | null>;

  // get multiple records
  abstract get(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<IamBoundedContext[]>;

  // get records with rawSQL
  abstract rawSQL(options?: {
    rawSQL?: string;
    cQMetadata?: CQMetadata;
  }): Promise<IamBoundedContext[]>;

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
    boundedContext: IamBoundedContext,
    options?: {
      createOptions?: LiteralObject;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
      // arguments to find object and check if object is duplicated
      finderQueryStatement?: (aggregate: IamBoundedContext) => QueryStatement;
    },
  ): Promise<void>;

  // create a single or multiple records
  abstract insert(
    boundedContexts: IamBoundedContext[],
    options?: {
      insertOptions?: LiteralObject;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
    },
  ): Promise<void>;

  // update record by id
  abstract updateById(
    boundedContext: IamBoundedContext,
    options?: {
      updateByIdOptions?: LiteralObject;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
      // arguments to find object to update, with i18n we use langId and id relationship with parent entity
      findArguments?: LiteralObject;
    },
  ): Promise<void>;

  // update records
  abstract update(
    boundedContext: IamBoundedContext,
    options?: {
      updateOptions?: LiteralObject;
      queryStatement?: QueryStatement;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
    },
  ): Promise<void>;

  // update and increment records
  abstract updateAndIncrement(
    boundedContext: IamBoundedContext,
    options?: {
      updateAndIncrementOptions?: LiteralObject;
      queryStatement?: QueryStatement;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
    },
  ): Promise<void>;

  // insert or update key identification element already existing in the table
  abstract upsert(
    boundedContext: IamBoundedContext,
    options?: {
      upsertOptions?: LiteralObject;
      dataFactory?: (aggregate: IamBoundedContext) => LiteralObject;
    },
  ): Promise<void>;

  // delete record
  abstract deleteById(
    id: IamBoundedContextId,
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
