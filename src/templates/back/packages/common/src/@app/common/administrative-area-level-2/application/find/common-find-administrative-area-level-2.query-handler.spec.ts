import {
  CommonAdministrativeAreaLevel2Mapper,
  CommonFindAdministrativeAreaLevel2Query,
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import { CommonFindAdministrativeAreaLevel2QueryHandler } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2.query-handler';
import { CommonFindAdministrativeAreaLevel2Service } from '@app/common/administrative-area-level-2/application/find/common-find-administrative-area-level-2.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel2QueryHandler', () => {
  let queryHandler: CommonFindAdministrativeAreaLevel2QueryHandler;
  let service: CommonFindAdministrativeAreaLevel2Service;
  let repository: CommonMockAdministrativeAreaLevel2Repository;
  let mapper: CommonAdministrativeAreaLevel2Mapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAdministrativeAreaLevel2QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useClass: CommonMockAdministrativeAreaLevel2Repository,
        },
        {
          provide: CommonFindAdministrativeAreaLevel2Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAdministrativeAreaLevel2QueryHandler>(
      CommonFindAdministrativeAreaLevel2QueryHandler,
    );
    service = module.get<CommonFindAdministrativeAreaLevel2Service>(
      CommonFindAdministrativeAreaLevel2Service,
    );
    repository = <CommonMockAdministrativeAreaLevel2Repository>(
      module.get<CommonIAdministrativeAreaLevel2Repository>(
        CommonIAdministrativeAreaLevel2Repository,
      )
    );
    mapper = new CommonAdministrativeAreaLevel2Mapper();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel2QueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an administrativeAreaLevel2 founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new CommonFindAdministrativeAreaLevel2Query(),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
