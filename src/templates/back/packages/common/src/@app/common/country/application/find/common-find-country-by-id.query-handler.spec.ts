import {
  CommonCountryMapper,
  CommonFindCountryByIdQuery,
  CommonICountryRepository,
  commonMockCountryData,
  CommonMockCountryRepository,
} from '@app/common/country';
import { CommonFindCountryByIdQueryHandler } from '@app/common/country/application/find/common-find-country-by-id.query-handler';
import { CommonFindCountryByIdService } from '@app/common/country/application/find/common-find-country-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryByIdQueryHandler', () => {
  let queryHandler: CommonFindCountryByIdQueryHandler;
  let service: CommonFindCountryByIdService;
  let repository: CommonMockCountryRepository;
  let mapper: CommonCountryMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindCountryByIdQueryHandler,
        {
          provide: CommonICountryRepository,
          useClass: CommonMockCountryRepository,
        },
        {
          provide: CommonFindCountryByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindCountryByIdQueryHandler>(
      CommonFindCountryByIdQueryHandler,
    );
    service = module.get<CommonFindCountryByIdService>(
      CommonFindCountryByIdService,
    );
    repository = <CommonMockCountryRepository>(
      module.get<CommonICountryRepository>(CommonICountryRepository)
    );
    mapper = new CommonCountryMapper();
  });

  describe('main', () => {
    test('FindCountryByIdQueryHandler should be defined', () => {
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
        await queryHandler.execute(
          new CommonFindCountryByIdQuery(commonMockCountryData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
