import { ToolsKeyValue, ToolsKeyValueResponse } from '@app/tools/key-value';
import {
  ToolsKeyValueCreatedAt,
  ToolsKeyValueDeletedAt,
  ToolsKeyValueDescription,
  ToolsKeyValueId,
  ToolsKeyValueIsActive,
  ToolsKeyValueIsCached,
  ToolsKeyValueKey,
  ToolsKeyValueRowId,
  ToolsKeyValueType,
  ToolsKeyValueUpdatedAt,
  ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class ToolsKeyValueMapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param keyValue
   */
  mapModelToAggregate(
    keyValue: LiteralObject,
    cQMetadata?: CQMetadata,
  ): ToolsKeyValue {
    if (!keyValue) return;

    return this.makeAggregate(keyValue, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param keyValues
   */
  mapModelsToAggregates(
    keyValues: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): ToolsKeyValue[] {
    if (!Array.isArray(keyValues)) return;

    return keyValues.map((keyValue) =>
      this.makeAggregate(keyValue, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param keyValue
   */
  mapAggregateToResponse(keyValue: ToolsKeyValue): ToolsKeyValueResponse {
    return this.makeResponse(keyValue);
  }

  /**
   * Map array of aggregates to array responses
   * @param keyValues
   */
  mapAggregatesToResponses(
    keyValues: ToolsKeyValue[],
  ): ToolsKeyValueResponse[] {
    if (!Array.isArray(keyValues)) return;

    return keyValues.map((keyValue) => this.makeResponse(keyValue));
  }

  private makeAggregate(
    keyValue: LiteralObject,
    cQMetadata?: CQMetadata,
  ): ToolsKeyValue {
    return ToolsKeyValue.register(
      new ToolsKeyValueId(keyValue.id, { undefinable: true }),
      new ToolsKeyValueRowId(keyValue.rowId, { undefinable: true }),
      new ToolsKeyValueKey(keyValue.key, { undefinable: true }),
      new ToolsKeyValueType(keyValue.type, { undefinable: true }),
      new ToolsKeyValueValue(keyValue.value, { undefinable: true }),
      new ToolsKeyValueIsCached(keyValue.isCached, { undefinable: true }),
      new ToolsKeyValueIsActive(keyValue.isActive, { undefinable: true }),
      new ToolsKeyValueDescription(keyValue.description, {
        undefinable: true,
      }),
      new ToolsKeyValueCreatedAt(
        keyValue.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new ToolsKeyValueUpdatedAt(
        keyValue.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new ToolsKeyValueDeletedAt(
        keyValue.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
    );
  }

  private makeResponse(keyValue: ToolsKeyValue): ToolsKeyValueResponse {
    if (!keyValue) return null;

    return new ToolsKeyValueResponse(
      keyValue.id.value,
      keyValue.rowId.value,
      keyValue.key.value,
      keyValue.type.value,
      keyValue.value.value,
      keyValue.isCached.value,
      keyValue.isActive.value,
      keyValue.description.value,
      keyValue.createdAt.value,
      keyValue.updatedAt.value,
      keyValue.deletedAt.value,
    );
  }
}
