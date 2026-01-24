/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel1Repository,
  commonMockAdministrativeAreaLevel1Data,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-area-level-1-by-id.service';
import { CommonAdministrativeAreaLevel1Id } from '@app/common/administrative-area-level-1/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel1ByIdService', () => {
  let service: CommonDeleteAdministrativeAreaLevel1ByIdService;
  let repository: CommonIAdministrativeAreaLevel1Repository;
  let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteAdministrativeAreaLevel1ByIdService,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
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

    service = module.get(CommonDeleteAdministrativeAreaLevel1ByIdService);
    repository = module.get(CommonIAdministrativeAreaLevel1Repository);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreaLevel1ByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete administrativeAreaLevel1 and emit event', async () => {
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
          new CommonAdministrativeAreaLevel1Id(
            commonMockAdministrativeAreaLevel1Data[0].id,
          ),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
