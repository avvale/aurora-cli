/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel3Repository,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/create/common-create-administrative-areas-level-3.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel3Service', () => {
  let service: CommonCreateAdministrativeAreasLevel3Service;
  let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateAdministrativeAreasLevel3Service,
        CommonMockAdministrativeAreaLevel3Repository,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateAdministrativeAreasLevel3Service);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
  });

  describe('main', () => {
    test('CreateAdministrativeAreasLevel3Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create administrativeAreasLevel3 and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
