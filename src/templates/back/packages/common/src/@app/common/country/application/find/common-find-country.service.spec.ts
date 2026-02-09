/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonICountryRepository,
  CommonMockCountryRepository,
} from '@app/common/country';
import { CommonFindCountryService } from '@app/common/country/application/find/common-find-country.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryService', () => {
  let service: CommonFindCountryService;
  let repository: CommonICountryRepository;
  let mockRepository: CommonMockCountryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindCountryService,
        CommonMockCountryRepository,
        {
          provide: CommonICountryRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindCountryService);
    repository = module.get(CommonICountryRepository);
    mockRepository = module.get(CommonMockCountryRepository);
  });

  describe('main', () => {
    test('CommonFindCountryService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find country', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
