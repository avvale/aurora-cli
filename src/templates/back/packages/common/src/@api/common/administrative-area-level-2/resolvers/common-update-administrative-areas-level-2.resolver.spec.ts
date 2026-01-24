/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateAdministrativeAreasLevel2Handler,
  CommonUpdateAdministrativeAreasLevel2Resolver,
} from '@api/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel2Resolver', () => {
  let resolver: CommonUpdateAdministrativeAreasLevel2Resolver;
  let handler: CommonUpdateAdministrativeAreasLevel2Handler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAdministrativeAreasLevel2Resolver,
        {
          provide: CommonUpdateAdministrativeAreasLevel2Handler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateAdministrativeAreasLevel2Resolver>(
      CommonUpdateAdministrativeAreasLevel2Resolver,
    );
    handler = module.get<CommonUpdateAdministrativeAreasLevel2Handler>(
      CommonUpdateAdministrativeAreasLevel2Handler,
    );
  });

  test('CommonUpdateAdministrativeAreasLevel2Resolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreasLevel2Resolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a administrativeAreasLevel2 updated', async () => {
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
          <CommonUpdateAdministrativeAreasLevel2Input>(
            commonMockAdministrativeAreaLevel2Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel2Data[0]);
    });
  });
});
