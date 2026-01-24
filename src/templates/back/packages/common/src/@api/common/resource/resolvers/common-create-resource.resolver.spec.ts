/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonCreateResourceHandler,
  CommonCreateResourceResolver,
} from '@api/common/resource';
import { CommonCreateResourceInput } from '@api/graphql';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateResourceResolver', () => {
  let resolver: CommonCreateResourceResolver;
  let handler: CommonCreateResourceHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateResourceResolver,
        {
          provide: CommonCreateResourceHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateResourceResolver>(
      CommonCreateResourceResolver,
    );
    handler = module.get<CommonCreateResourceHandler>(
      CommonCreateResourceHandler,
    );
  });

  test('CommonCreateResourceResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateResourceResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an resource created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData[0])),
        );
      expect(
        await resolver.main(
          <CommonCreateResourceInput>commonMockResourceData[0],
        ),
      ).toBe(commonMockResourceData[0]);
    });
  });
});
