/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteResourceByIdHandler,
  CommonDeleteResourceByIdResolver,
} from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourceByIdResolver', () => {
  let resolver: CommonDeleteResourceByIdResolver;
  let handler: CommonDeleteResourceByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteResourceByIdResolver,
        {
          provide: CommonDeleteResourceByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteResourceByIdResolver>(
      CommonDeleteResourceByIdResolver,
    );
    handler = module.get<CommonDeleteResourceByIdHandler>(
      CommonDeleteResourceByIdHandler,
    );
  });

  test('CommonDeleteResourceByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteResourceByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an resource deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(await resolver.main(commonMockResourceData[0].id)).toBe(
        commonMockResourceData[0],
      );
    });
  });
});
