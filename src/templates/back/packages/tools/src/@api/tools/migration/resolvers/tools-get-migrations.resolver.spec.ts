/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsGetMigrationsHandler,
  ToolsGetMigrationsResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetMigrationsResolver', () => {
  let resolver: ToolsGetMigrationsResolver;
  let handler: ToolsGetMigrationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsGetMigrationsResolver,
        {
          provide: ToolsGetMigrationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsGetMigrationsResolver>(
      ToolsGetMigrationsResolver,
    );
    handler = module.get<ToolsGetMigrationsHandler>(ToolsGetMigrationsHandler);
  });

  test('ToolsGetMigrationsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsGetMigrationsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockMigrationData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData)),
        );
      expect(await resolver.main()).toBe(toolsMockMigrationData);
    });
  });
});
