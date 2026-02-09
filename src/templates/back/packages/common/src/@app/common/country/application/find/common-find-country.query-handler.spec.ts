/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonCountryMapper,
  CommonFindCountryQuery,
  CommonICountryRepository,
  CommonMockCountryRepository,
} from '@app/common/country';
import { CommonFindCountryQueryHandler } from '@app/common/country/application/find/common-find-country.query-handler';
import { CommonFindCountryService } from '@app/common/country/application/find/common-find-country.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryQueryHandler', () => {
  let queryHandler: CommonFindCountryQueryHandler;
  let service: CommonFindCountryService;
  let repository: CommonMockCountryRepository;
  let mapper: CommonCountryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindCountryQueryHandler,
        {
          provide: CommonICountryRepository,
          useClass: CommonMockCountryRepository,
        },
        {
          provide: CommonFindCountryService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindCountryQueryHandler>(
      CommonFindCountryQueryHandler,
    );
    service = module.get<CommonFindCountryService>(CommonFindCountryService);
    repository = <CommonMockCountryRepository>(
      module.get<CommonICountryRepository>(CommonICountryRepository)
    );
    mapper = new CommonCountryMapper();
  });

  describe('main', () => {
    test('CommonFindCountryQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an country founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new CommonFindCountryQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
