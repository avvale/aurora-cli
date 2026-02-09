/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonGetResourcesHandler,
  CommonGetResourcesResolver,
} from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetResourcesResolver', () => {
  let resolver: CommonGetResourcesResolver;
  let handler: CommonGetResourcesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetResourcesResolver,
        {
          provide: CommonGetResourcesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonGetResourcesResolver>(
      CommonGetResourcesResolver,
    );
    handler = module.get<CommonGetResourcesHandler>(CommonGetResourcesHandler);
  });

  test('CommonGetResourcesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetResourcesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockResourceData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockResourceData)),
        );
      expect(await resolver.main()).toBe(commonMockResourceData);
    });
  });
});
