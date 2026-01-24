/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsDeleteKeyValuesHandler,
  ToolsDeleteKeyValuesResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValuesResolver', () => {
  let resolver: ToolsDeleteKeyValuesResolver;
  let handler: ToolsDeleteKeyValuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteKeyValuesResolver,
        {
          provide: ToolsDeleteKeyValuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsDeleteKeyValuesResolver>(
      ToolsDeleteKeyValuesResolver,
    );
    handler = module.get<ToolsDeleteKeyValuesHandler>(
      ToolsDeleteKeyValuesHandler,
    );
  });

  test('ToolsDeleteKeyValuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDeleteKeyValuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an toolsMockKeyValueData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockKeyValueData)),
        );
      expect(await resolver.main()).toBe(toolsMockKeyValueData);
    });
  });
});
