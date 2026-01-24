/* eslint-disable key-spacing */
import { ToolsCreatedInformationSchemaRequestEvent } from '@app/tools/information-schema';
import { ToolsInformationSchemaRawSql } from '@app/tools/information-schema/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsInformationSchemaSqlRequest extends AggregateRoot {
  rawSql: any;

  constructor(rawSql: any) {
    super();
    this.rawSql = rawSql;
  }

  static register(
    rawSql: ToolsInformationSchemaRawSql,
  ): ToolsInformationSchemaSqlRequest {
    return new ToolsInformationSchemaSqlRequest(rawSql);
  }

  created(event: {
    payload: ToolsInformationSchemaSqlRequest;
    cQMetadata?: CQMetadata;
  }): void {
    this.apply(
      new ToolsCreatedInformationSchemaRequestEvent({
        payload: {
          rawSql: event.payload.rawSql.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      rawSql: this.rawSql.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      rawSql: this.rawSql.value,
    };
  }
}
