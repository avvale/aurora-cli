/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindResourceByIdHandler,
  CommonFindResourceByIdResolver,
} from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindResourceByIdResolver', () => {
  let resolver: CommonFindResourceByIdResolver;
  let handler: CommonFindResourceByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindResourceByIdResolver,
        {
          provide: CommonFindResourceByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindResourceByIdResolver>(
      CommonFindResourceByIdResolver,
    );
    handler = module.get<CommonFindResourceByIdHandler>(
      CommonFindResourceByIdHandler,
    );
  });

  test('CommonFindResourceByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindResourceByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an resource by id', async () => {
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
