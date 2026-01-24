/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/create/common-create-administrative-areas-level-1.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel1Service', () => {
  let service: CommonCreateAdministrativeAreasLevel1Service;
  let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateAdministrativeAreasLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateAdministrativeAreasLevel1Service);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('CreateAdministrativeAreasLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create administrativeAreasLevel1 and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
