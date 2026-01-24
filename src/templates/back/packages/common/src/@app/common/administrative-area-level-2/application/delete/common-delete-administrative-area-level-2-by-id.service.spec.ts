/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel2Repository,
  commonMockAdministrativeAreaLevel2Data,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonDeleteAdministrativeAreaLevel2ByIdService } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-area-level-2-by-id.service';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel2ByIdService', () => {
  let service: CommonDeleteAdministrativeAreaLevel2ByIdService;
  let repository: CommonIAdministrativeAreaLevel2Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteAdministrativeAreaLevel2ByIdService,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonDeleteAdministrativeAreaLevel2ByIdService);
    repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel2ByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete administrativeAreaLevel2 and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new CommonAdministrativeAreaLevel2Id(
            commonMockAdministrativeAreaLevel2Data[0].id,
          ),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
