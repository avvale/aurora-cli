/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIKeyValueRepository,
    toolsMockKeyValueData,
    ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsCreateKeyValueService } from '@app/tools/key-value/application/create/tools-create-key-value.service';
import {
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
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

describe('ToolsCreateKeyValueService', () => {
    let service: ToolsCreateKeyValueService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsCreateKeyValueService,
                ToolsMockKeyValueRepository,
                {
                    provide: ToolsIKeyValueRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsCreateKeyValueService);
    });

    describe('main', () => {
        test('ToolsCreateKeyValueService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a keyValue and emit event', async () => {
            expect(
                await service.main({
                    id: new ToolsKeyValueId(toolsMockKeyValueData[0].id),
                    rowId: new ToolsKeyValueRowId(
                        toolsMockKeyValueData[0].rowId,
                    ),
                    key: new ToolsKeyValueKey(toolsMockKeyValueData[0].key),
                    type: new ToolsKeyValueType(toolsMockKeyValueData[0].type),
                    value: new ToolsKeyValueValue(
                        toolsMockKeyValueData[0].value,
                    ),
                    isActive: new ToolsKeyValueIsActive(
                        toolsMockKeyValueData[0].isActive,
                    ),
                    description: new ToolsKeyValueDescription(
                        toolsMockKeyValueData[0].description,
                    ),
                }),
            ).toBe(undefined);
        });
    });
});
