/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsFindMigrationHandler,
  ToolsFindMigrationResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationResolver', () => {
  let resolver: ToolsFindMigrationResolver;
  let handler: ToolsFindMigrationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindMigrationResolver,
        {
          provide: ToolsFindMigrationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsFindMigrationResolver>(
      ToolsFindMigrationResolver,
    );
    handler = module.get<ToolsFindMigrationHandler>(ToolsFindMigrationHandler);
  });

  test('ToolsFindMigrationResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindMigrationResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a migration', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData[0])),
        );
      expect(await resolver.main()).toBe(toolsMockMigrationData[0]);
    });
  });
});
