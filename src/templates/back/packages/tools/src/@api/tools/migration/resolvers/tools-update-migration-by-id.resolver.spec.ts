/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateMigrationByIdInput } from '@api/graphql';
import {
  ToolsUpdateMigrationByIdHandler,
  ToolsUpdateMigrationByIdResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationByIdResolver', () => {
  let resolver: ToolsUpdateMigrationByIdResolver;
  let handler: ToolsUpdateMigrationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsUpdateMigrationByIdResolver,
        {
          provide: ToolsUpdateMigrationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsUpdateMigrationByIdResolver>(
      ToolsUpdateMigrationByIdResolver,
    );
    handler = module.get<ToolsUpdateMigrationByIdHandler>(
      ToolsUpdateMigrationByIdHandler,
    );
  });

  test('ToolsUpdateMigrationByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsUpdateMigrationByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a migration by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockMigrationData[0])),
        );
      expect(
        await resolver.main(
          <ToolsUpdateMigrationByIdInput>toolsMockMigrationData[0],
        ),
      ).toBe(toolsMockMigrationData[0]);
    });
  });
});
