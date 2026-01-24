/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateKeyValueByIdInput } from '@api/graphql';
import { ToolsUpdateKeyValueByIdHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValueByIdHandler', () => {
  let handler: ToolsUpdateKeyValueByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsUpdateKeyValueByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
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

    handler = module.get<ToolsUpdateKeyValueByIdHandler>(
      ToolsUpdateKeyValueByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsUpdateKeyValueByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsUpdateKeyValueByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a keyValue updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
        );
      expect(
        await handler.main(
          <ToolsUpdateKeyValueByIdInput>toolsMockKeyValueData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(toolsMockKeyValueData[0]);
    });
  });
});
