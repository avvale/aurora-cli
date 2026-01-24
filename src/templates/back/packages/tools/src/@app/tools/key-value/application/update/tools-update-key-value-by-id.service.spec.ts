/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIKeyValueRepository,
  toolsMockKeyValueData,
  ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsUpdateKeyValueByIdService } from '@app/tools/key-value/application/update/tools-update-key-value-by-id.service';
import {
  ToolsKeyValueDescription,
  ToolsKeyValueId,
  ToolsKeyValueIsActive,
  ToolsKeyValueIsCached,
  ToolsKeyValueKey,
  ToolsKeyValueRowId,
  ToolsKeyValueType,
  ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValueByIdService', () => {
  let service: ToolsUpdateKeyValueByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsUpdateKeyValueByIdService,
        ToolsMockKeyValueRepository,
        {
          provide: ToolsIKeyValueRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsUpdateKeyValueByIdService);
  });

  describe('main', () => {
    test('ToolsUpdateKeyValueByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a keyValue and emit event', async () => {
      expect(
        await service.main(
          {
            id: new ToolsKeyValueId(toolsMockKeyValueData[0].id),
            rowId: new ToolsKeyValueRowId(toolsMockKeyValueData[0].rowId),
            key: new ToolsKeyValueKey(toolsMockKeyValueData[0].key),
            type: new ToolsKeyValueType(toolsMockKeyValueData[0].type),
            value: new ToolsKeyValueValue(toolsMockKeyValueData[0].value),
            isCached: new ToolsKeyValueIsCached(
              toolsMockKeyValueData[0].isCached,
            ),
            isActive: new ToolsKeyValueIsActive(
              toolsMockKeyValueData[0].isActive,
            ),
            description: new ToolsKeyValueDescription(
              toolsMockKeyValueData[0].description,
            ),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});
