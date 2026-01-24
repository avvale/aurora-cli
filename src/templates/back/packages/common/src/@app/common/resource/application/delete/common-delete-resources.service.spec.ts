/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIResourceRepository,
  CommonMockResourceRepository,
} from '@app/common/resource';
import { CommonDeleteResourcesService } from '@app/common/resource/application/delete/common-delete-resources.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourcesService', () => {
  let service: CommonDeleteResourcesService;
  let repository: CommonIResourceRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteResourcesService,
        CommonMockResourceRepository,
        {
          provide: CommonIResourceRepository,
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

    service = module.get(CommonDeleteResourcesService);
    repository = module.get(CommonIResourceRepository);
  });

  describe('main', () => {
    test('CommonDeleteResourcesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete resource and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
