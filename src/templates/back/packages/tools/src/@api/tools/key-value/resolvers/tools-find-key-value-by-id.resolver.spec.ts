/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsFindKeyValueByIdHandler,
  ToolsFindKeyValueByIdResolver,
} from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindKeyValueByIdResolver', () => {
  let resolver: ToolsFindKeyValueByIdResolver;
  let handler: ToolsFindKeyValueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindKeyValueByIdResolver,
        {
          provide: ToolsFindKeyValueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsFindKeyValueByIdResolver>(
      ToolsFindKeyValueByIdResolver,
    );
    handler = module.get<ToolsFindKeyValueByIdHandler>(
      ToolsFindKeyValueByIdHandler,
    );
  });

  test('ToolsFindKeyValueByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindKeyValueByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an keyValue by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockKeyValueData[0])),
        );
      expect(await resolver.main(toolsMockKeyValueData[0].id)).toBe(
        toolsMockKeyValueData[0],
      );
    });
  });
});
