/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindMigrationHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationHandler', () => {
  let handler: ToolsFindMigrationHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindMigrationHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsFindMigrationHandler>(ToolsFindMigrationHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsFindMigrationHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindMigrationHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a migration', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        toolsMockMigrationData[0],
      );
    });
  });
});
