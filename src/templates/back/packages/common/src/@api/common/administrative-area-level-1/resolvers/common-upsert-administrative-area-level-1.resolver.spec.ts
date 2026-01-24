/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpsertAdministrativeAreaLevel1Handler,
  CommonUpsertAdministrativeAreaLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel1Resolver', () => {
  let resolver: CommonUpsertAdministrativeAreaLevel1Resolver;
  let handler: CommonUpsertAdministrativeAreaLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpsertAdministrativeAreaLevel1Resolver,
        {
          provide: CommonUpsertAdministrativeAreaLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpsertAdministrativeAreaLevel1Resolver>(
      CommonUpsertAdministrativeAreaLevel1Resolver,
    );
    handler = module.get<CommonUpsertAdministrativeAreaLevel1Handler>(
      CommonUpsertAdministrativeAreaLevel1Handler,
    );
  });

  test('CommonUpsertAdministrativeAreaLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpsertAdministrativeAreaLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 upserted', async () => {
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
          <CommonUpdateAdministrativeAreaLevel1ByIdInput>(
            commonMockAdministrativeAreaLevel1Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
