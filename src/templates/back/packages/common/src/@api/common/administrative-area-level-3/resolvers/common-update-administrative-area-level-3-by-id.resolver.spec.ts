/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import {
  CommonUpdateAdministrativeAreaLevel3ByIdHandler,
  CommonUpdateAdministrativeAreaLevel3ByIdResolver,
} from '@api/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel3ByIdResolver', () => {
  let resolver: CommonUpdateAdministrativeAreaLevel3ByIdResolver;
  let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAdministrativeAreaLevel3ByIdResolver,
        {
          provide: CommonUpdateAdministrativeAreaLevel3ByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateAdministrativeAreaLevel3ByIdResolver>(
      CommonUpdateAdministrativeAreaLevel3ByIdResolver,
    );
    handler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(
      CommonUpdateAdministrativeAreaLevel3ByIdHandler,
    );
  });

  test('CommonUpdateAdministrativeAreaLevel3ByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAdministrativeAreaLevel3ByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a administrativeAreaLevel3 by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAdministrativeAreaLevel3Data[0]),
            ),
        );
      expect(
        await resolver.main(
          <CommonUpdateAdministrativeAreaLevel3ByIdInput>(
            commonMockAdministrativeAreaLevel3Data[0]
          ),
        ),
      ).toBe(commonMockAdministrativeAreaLevel3Data[0]);
    });
  });
});
