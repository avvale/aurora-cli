/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel1Mapper,
  CommonGetAdministrativeAreasLevel1Query,
  CommonIAdministrativeAreaLevel1Repository,
  CommonMockAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import { CommonGetAdministrativeAreasLevel1QueryHandler } from '@app/common/administrative-area-level-1/application/get/common-get-administrative-areas-level-1.query-handler';
import { CommonGetAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/get/common-get-administrative-areas-level-1.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAdministrativeAreasLevel1QueryHandler', () => {
  let queryHandler: CommonGetAdministrativeAreasLevel1QueryHandler;
  let service: CommonGetAdministrativeAreasLevel1Service;
  let repository: CommonMockAdministrativeAreaLevel1Repository;
  let mapper: CommonAdministrativeAreaLevel1Mapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonGetAdministrativeAreasLevel1QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel1Repository,
          useClass: CommonMockAdministrativeAreaLevel1Repository,
        },
        {
          provide: CommonGetAdministrativeAreasLevel1Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<CommonGetAdministrativeAreasLevel1QueryHandler>(
      CommonGetAdministrativeAreasLevel1QueryHandler,
    );
    service = module.get<CommonGetAdministrativeAreasLevel1Service>(
      CommonGetAdministrativeAreasLevel1Service,
    );
    repository = <CommonMockAdministrativeAreaLevel1Repository>(
      module.get<CommonIAdministrativeAreaLevel1Repository>(
        CommonIAdministrativeAreaLevel1Repository,
      )
    );
    mapper = new CommonAdministrativeAreaLevel1Mapper();
  });

  describe('main', () => {
    test('CommonGetAdministrativeAreasLevel1QueryHandler should be defined', () => {
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
          new CommonGetAdministrativeAreasLevel1Query(),
        ),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
