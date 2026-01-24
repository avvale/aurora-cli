/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateAdministrativeAreasLevel1Handler,
  CommonUpdateAdministrativeAreasLevel1Resolver,
} from '@api/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel1Resolver', () => {
  let resolver: CommonUpdateAdministrativeAreasLevel1Resolver;
  let handler: CommonUpdateAdministrativeAreasLevel1Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAdministrativeAreasLevel1Resolver,
        {
          provide: CommonUpdateAdministrativeAreasLevel1Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateAdministrativeAreasLevel1Resolver>(
      CommonUpdateAdministrativeAreasLevel1Resolver,
    );
    handler = module.get<CommonUpdateAdministrativeAreasLevel1Handler>(
      CommonUpdateAdministrativeAreasLevel1Handler,
    );
  });

  test('CommonUpdateAdministrativeAreasLevel1Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreasLevel1Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a administrativeAreasLevel1 updated', async () => {
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
          <CommonUpdateAdministrativeAreasLevel1Input>(
            commonMockAdministrativeAreaLevel1Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel1Data[0]);
    });
  });
});
