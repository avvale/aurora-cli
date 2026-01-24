/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonDeleteAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/delete/common-delete-administrative-areas-level-1.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel1Service', () => {
  let service: CommonDeleteAdministrativeAreasLevel1Service;
  let repository: CommonIAdministrativeAreaLevel1Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteAdministrativeAreasLevel1Service,
        CommonMockAdministrativeAreaLevel1Repository,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonDeleteAdministrativeAreasLevel1Service);
    repository = module.get(CommonIAdministrativeAreaLevel1Repository);
  });

  describe('main', () => {
    test('CommonDeleteAdministrativeAreasLevel1Service should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete administrativeAreaLevel1 and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
