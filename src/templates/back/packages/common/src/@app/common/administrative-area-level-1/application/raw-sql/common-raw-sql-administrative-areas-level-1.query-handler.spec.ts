import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
  CommonRawSQLAdministrativeAreasLevel1Query,
} from '@app/common/administrative-area-level-1';
import { CommonRawSQLAdministrativeAreasLevel1QueryHandler } from '@app/common/administrative-area-level-1/application/raw-sql/common-raw-sql-administrative-areas-level-1.query-handler';
import { CommonRawSQLAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/raw-sql/common-raw-sql-administrative-areas-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLAdministrativeAreasLevel1QueryHandler', () => {
  let queryHandler: CommonRawSQLAdministrativeAreasLevel1QueryHandler;
  let service: CommonRawSQLAdministrativeAreasLevel1Service;
  let repository: CommonMockAdministrativeAreaLevel1Repository;
  let mapper: CommonAdministrativeAreaLevel1Mapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonRawSQLAdministrativeAreasLevel1QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useClass: CommonMockAdministrativeAreaLevel1Repository,
        },
        {
          provide: CommonRawSQLAdministrativeAreasLevel1Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler =
      module.get<CommonRawSQLAdministrativeAreasLevel1QueryHandler>(
        CommonRawSQLAdministrativeAreasLevel1QueryHandler,
      );
    service = module.get<CommonRawSQLAdministrativeAreasLevel1Service>(
      CommonRawSQLAdministrativeAreasLevel1Service,
    );
    repository = <CommonMockAdministrativeAreaLevel1Repository>(
      module.get<CommonIAdministrativeAreaLevel1Repository>(
        CommonIAdministrativeAreaLevel1Repository,
      )
    );
    mapper = new CommonAdministrativeAreaLevel1Mapper();
  });

  describe('main', () => {
    test('CommonRawSQLAdministrativeAreasLevel1QueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an administrativeAreasLevel1 founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(
          new CommonRawSQLAdministrativeAreasLevel1Query(),
        ),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
