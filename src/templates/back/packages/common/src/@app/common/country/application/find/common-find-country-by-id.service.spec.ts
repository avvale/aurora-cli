/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonICountryRepository,
  commonMockCountryData,
  CommonMockCountryRepository,
} from '@app/common/country';
import { CommonFindCountryByIdService } from '@app/common/country/application/find/common-find-country-by-id.service';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryByIdService', () => {
  let service: CommonFindCountryByIdService;
  let repository: CommonICountryRepository;
  let mockRepository: CommonMockCountryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindCountryByIdService,
        CommonMockCountryRepository,
        {
          provide: CommonICountryRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindCountryByIdService);
    repository = module.get(CommonICountryRepository);
    mockRepository = module.get(CommonMockCountryRepository);
  });

  describe('main', () => {
    test('FindCountryByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find country by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new CommonCountryId(commonMockCountryData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
