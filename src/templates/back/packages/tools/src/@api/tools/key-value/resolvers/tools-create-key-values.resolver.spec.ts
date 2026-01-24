import { ToolsCreateKeyValueInput } from '@api/graphql';
import {
  ToolsCreateKeyValuesHandler,
  ToolsCreateKeyValuesResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValuesResolver', () => {
  let resolver: ToolsCreateKeyValuesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateKeyValuesResolver,
        {
          provide: ToolsCreateKeyValuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsCreateKeyValuesResolver>(
      ToolsCreateKeyValuesResolver,
    );
  });

  test('ToolsCreateKeyValuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsCreateKeyValuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an keyValues created', async () => {
      expect(
        await resolver.main(<ToolsCreateKeyValueInput[]>toolsMockKeyValueData),
      ).toBe(undefined);
    });
  });
});
