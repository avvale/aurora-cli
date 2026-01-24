/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsPaginateKeyValuesHandler,
  ToolsPaginateKeyValuesResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateKeyValuesResolver', () => {
  let resolver: ToolsPaginateKeyValuesResolver;
  let handler: ToolsPaginateKeyValuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsPaginateKeyValuesResolver,
        {
          provide: ToolsPaginateKeyValuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsPaginateKeyValuesResolver>(
      ToolsPaginateKeyValuesResolver,
    );
    handler = module.get<ToolsPaginateKeyValuesHandler>(
      ToolsPaginateKeyValuesHandler,
    );
  });

  test('ToolsPaginateKeyValuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsPaginateKeyValuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockKeyValueData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: toolsMockKeyValueData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: toolsMockKeyValueData,
      });
    });
  });
});
