/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationsHandler', () => {
  let handler: ToolsDeleteMigrationsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteMigrationsHandler,
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

    handler = module.get<ToolsDeleteMigrationsHandler>(
      ToolsDeleteMigrationsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsDeleteMigrationsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDeleteMigrationsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockMigrationData deleted', async () => {
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
