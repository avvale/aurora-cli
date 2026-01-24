import { ToolsWebhookLog } from '@app/tools/webhook-log';
import {
  CQMetadata,
  IRepository,
  LiteralObject,
  Pagination,
  QueryStatement,
} from '@aurorajs.dev/core';
import { ToolsWebhookLogId } from './value-objects';

export abstract class ToolsIWebhookLogRepository
  implements IRepository<ToolsWebhookLog>
{
  abstract readonly repository: any;

  // paginate records
  abstract paginate(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<Pagination<ToolsWebhookLog>>;

  // find a single record
  abstract find(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<ToolsWebhookLog | null>;

  // find a single record by id
  abstract findById(
    id: ToolsWebhookLogId,
    options?: {
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      // if id is a composite key, pass find arguments, example: { key1: value1, key2: value2, ...}
      findArguments?: LiteralObject;
    },
  ): Promise<ToolsWebhookLog | null>;

  // get multiple records
  abstract get(options?: {
    queryStatement?: QueryStatement;
    constraint?: QueryStatement;
    cQMetadata?: CQMetadata;
  }): Promise<ToolsWebhookLog[]>;

  // get records with rawSQL
  abstract rawSQL(options?: {
    rawSQL?: string;
    cQMetadata?: CQMetadata;
  }): Promise<ToolsWebhookLog[]>;

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
    webhookLog: ToolsWebhookLog,
    options?: {
      createOptions?: LiteralObject;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
      // arguments to find object and check if object is duplicated
      finderQueryStatement?: (aggregate: ToolsWebhookLog) => QueryStatement;
    },
  ): Promise<void>;

  // create a single or multiple records
  abstract insert(
    webhookLogs: ToolsWebhookLog[],
    options?: {
      insertOptions?: LiteralObject;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
    },
  ): Promise<void>;

  // update record by id
  abstract updateById(
    webhookLog: ToolsWebhookLog,
    options?: {
      updateByIdOptions?: LiteralObject;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
      // arguments to find object to update, with i18n we use langId and id relationship with parent entity
      findArguments?: LiteralObject;
    },
  ): Promise<void>;

  // update records
  abstract update(
    webhookLog: ToolsWebhookLog,
    options?: {
      updateOptions?: LiteralObject;
      queryStatement?: QueryStatement;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
    },
  ): Promise<void>;

  // update and increment records
  abstract updateAndIncrement(
    webhookLog: ToolsWebhookLog,
    options?: {
      updateAndIncrementOptions?: LiteralObject;
      queryStatement?: QueryStatement;
      constraint?: QueryStatement;
      cQMetadata?: CQMetadata;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
    },
  ): Promise<void>;

  // insert or update key identification element already existing in the table
  abstract upsert(
    webhookLog: ToolsWebhookLog,
    options?: {
      upsertOptions?: LiteralObject;
      dataFactory?: (aggregate: ToolsWebhookLog) => LiteralObject;
    },
  ): Promise<void>;

  // delete record
  abstract deleteById(
    id: ToolsWebhookLogId,
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
