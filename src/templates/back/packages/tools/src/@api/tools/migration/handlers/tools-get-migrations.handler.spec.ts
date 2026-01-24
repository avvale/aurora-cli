/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetMigrationsHandler', () => {
  let handler: ToolsGetMigrationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsGetMigrationsHandler,
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

    handler = module.get<ToolsGetMigrationsHandler>(ToolsGetMigrationsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsGetMigrationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsGetMigrationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a toolsMockMigrationData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        toolsMockMigrationData,
      );
    });
  });
});
