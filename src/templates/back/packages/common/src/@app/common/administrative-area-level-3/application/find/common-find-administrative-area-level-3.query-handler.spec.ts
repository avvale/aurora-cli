import {
  CommonAdministrativeAreaLevel3Mapper,
  CommonFindAdministrativeAreaLevel3Query,
  CommonIAdministrativeAreaLevel3Repository,
  CommonMockAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import { CommonFindAdministrativeAreaLevel3QueryHandler } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3.query-handler';
import { CommonFindAdministrativeAreaLevel3Service } from '@app/common/administrative-area-level-3/application/find/common-find-administrative-area-level-3.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel3QueryHandler', () => {
  let queryHandler: CommonFindAdministrativeAreaLevel3QueryHandler;
  let service: CommonFindAdministrativeAreaLevel3Service;
  let repository: CommonMockAdministrativeAreaLevel3Repository;
  let mapper: CommonAdministrativeAreaLevel3Mapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAdministrativeAreaLevel3QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel3Repository,
          useClass: CommonMockAdministrativeAreaLevel3Repository,
        },
        {
          provide: CommonFindAdministrativeAreaLevel3Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAdministrativeAreaLevel3QueryHandler>(
      CommonFindAdministrativeAreaLevel3QueryHandler,
    );
    service = module.get<CommonFindAdministrativeAreaLevel3Service>(
      CommonFindAdministrativeAreaLevel3Service,
    );
    repository = <CommonMockAdministrativeAreaLevel3Repository>(
      module.get<CommonIAdministrativeAreaLevel3Repository>(
        CommonIAdministrativeAreaLevel3Repository,
      )
    );
    mapper = new CommonAdministrativeAreaLevel3Mapper();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel3QueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an administrativeAreaLevel3 founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new CommonFindAdministrativeAreaLevel3Query(),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
