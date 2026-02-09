/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonCreateAdministrativeAreaLevel2Handler,
  CommonCreateAdministrativeAreaLevel2Resolver,
} from '@api/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel2Resolver', () => {
  let resolver: CommonCreateAdministrativeAreaLevel2Resolver;
  let handler: CommonCreateAdministrativeAreaLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAdministrativeAreaLevel2Resolver,
        {
          provide: CommonCreateAdministrativeAreaLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAdministrativeAreaLevel2Resolver>(
      CommonCreateAdministrativeAreaLevel2Resolver,
    );
    handler = module.get<CommonCreateAdministrativeAreaLevel2Handler>(
      CommonCreateAdministrativeAreaLevel2Handler,
    );
  });

  test('CommonCreateAdministrativeAreaLevel2Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreaLevel2Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel2Data[0]),
            ),
        );
      expect(
        await resolver.main(
          <CommonCreateAdministrativeAreaLevel2Input>(
            commonMockAdministrativeAreaLevel2Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
