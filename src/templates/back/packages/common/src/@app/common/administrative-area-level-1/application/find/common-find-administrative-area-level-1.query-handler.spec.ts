/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonFindAdministrativeAreaLevel1Query,
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonFindAdministrativeAreaLevel1QueryHandler } from '@app/common/administrative-area-level-1/application/find/common-find-administrative-area-level-1.query-handler';
import { CommonFindAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/find/common-find-administrative-area-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAdministrativeAreaLevel1QueryHandler', () => {
  let queryHandler: CommonFindAdministrativeAreaLevel1QueryHandler;
  let service: CommonFindAdministrativeAreaLevel1Service;
  let repository: CommonMockAdministrativeAreaLevel1Repository;
  let mapper: CommonAdministrativeAreaLevel1Mapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonFindAdministrativeAreaLevel1QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useClass: CommonMockAdministrativeAreaLevel1Repository,
        },
        {
          provide: CommonFindAdministrativeAreaLevel1Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonFindAdministrativeAreaLevel1QueryHandler>(
      CommonFindAdministrativeAreaLevel1QueryHandler,
    );
    service = module.get<CommonFindAdministrativeAreaLevel1Service>(
      CommonFindAdministrativeAreaLevel1Service,
    );
    repository = <CommonMockAdministrativeAreaLevel1Repository>(
      module.get<CommonIAdministrativeAreaLevel1Repository>(
        CommonIAdministrativeAreaLevel1Repository,
      )
    );
    mapper = new CommonAdministrativeAreaLevel1Mapper();
  });

  describe('main', () => {
    test('CommonFindAdministrativeAreaLevel1QueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an administrativeAreaLevel1 founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new CommonFindAdministrativeAreaLevel1Query(),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
