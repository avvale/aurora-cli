import { ToolsCreateKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValuesHandler', () => {
  let handler: ToolsCreateKeyValuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateKeyValuesHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsCreateKeyValuesHandler>(
      ToolsCreateKeyValuesHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateKeyValuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockKeyValueData created', async () => {
      expect(await handler.main(toolsMockKeyValueData)).toBe(true);
    });
  });
});
