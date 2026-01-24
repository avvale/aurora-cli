/* eslint-disable key-spacing */
import { ToolsInformationSchemaValue } from '@app/tools/information-schema/domain/value-objects';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsInformationSchemaSqlResponse extends AggregateRoot {
  value: any;

  constructor(value: any) {
    super();
    this.value = value;
  }

  static register(
    value: ToolsInformationSchemaValue,
  ): ToolsInformationSchemaSqlResponse {
    return new ToolsInformationSchemaSqlResponse(value);
  }

  toDTO(): LiteralObject {
    return {
      queryResponse: this.value.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      queryResponse: this.value.value,
    };
  }
}
