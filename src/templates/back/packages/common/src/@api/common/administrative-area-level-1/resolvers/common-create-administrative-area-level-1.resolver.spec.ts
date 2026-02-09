/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonCreateAdministrativeAreaLevel1Handler,
  CommonCreateAdministrativeAreaLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel1Resolver', () => {
  let resolver: CommonCreateAdministrativeAreaLevel1Resolver;
  let handler: CommonCreateAdministrativeAreaLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAdministrativeAreaLevel1Resolver,
        {
          provide: CommonCreateAdministrativeAreaLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAdministrativeAreaLevel1Resolver>(
      CommonCreateAdministrativeAreaLevel1Resolver,
    );
    handler = module.get<CommonCreateAdministrativeAreaLevel1Handler>(
      CommonCreateAdministrativeAreaLevel1Handler,
    );
  });

  test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel1Data[0]),
            ),
        );
      expect(
        await resolver.main(
          <CommonCreateAdministrativeAreaLevel1Input>(
            commonMockAdministrativeAreaLevel1Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
