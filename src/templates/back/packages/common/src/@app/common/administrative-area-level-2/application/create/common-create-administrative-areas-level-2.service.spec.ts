/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/create/common-create-administrative-areas-level-2.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel2Service', () => {
  let service: CommonCreateAdministrativeAreasLevel2Service;
  let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateAdministrativeAreasLevel2Service,
        CommonMockAdministrativeAreaLevel2Repository,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateAdministrativeAreasLevel2Service);
    mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
  });

  describe('main', () => {
    test('CreateAdministrativeAreasLevel2Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create administrativeAreasLevel2 and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
