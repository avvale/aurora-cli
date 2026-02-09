/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonIAdministrativeAreaLevel2Repository,
  CommonMockAdministrativeAreaLevel2Repository,
  CommonPaginateAdministrativeAreasLevel2Query,
} from '@app/common/administrative-area-level-2';
import { CommonPaginateAdministrativeAreasLevel2QueryHandler } from '@app/common/administrative-area-level-2/application/paginate/common-paginate-administrative-areas-level-2.query-handler';
import { CommonPaginateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/paginate/common-paginate-administrative-areas-level-2.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAdministrativeAreasLevel2QueryHandler', () => {
  let queryHandler: CommonPaginateAdministrativeAreasLevel2QueryHandler;
  let service: CommonPaginateAdministrativeAreasLevel2Service;
  let repository: CommonMockAdministrativeAreaLevel2Repository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonPaginateAdministrativeAreasLevel2QueryHandler,
        {
          provide: CommonIAdministrativeAreaLevel2Repository,
          useClass: CommonMockAdministrativeAreaLevel2Repository,
        },
        {
          provide: CommonPaginateAdministrativeAreasLevel2Service,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler =
      module.get<CommonPaginateAdministrativeAreasLevel2QueryHandler>(
        CommonPaginateAdministrativeAreasLevel2QueryHandler,
      );
    service = module.get<CommonPaginateAdministrativeAreasLevel2Service>(
      CommonPaginateAdministrativeAreasLevel2Service,
    );
    repository = <CommonMockAdministrativeAreaLevel2Repository>(
      module.get<CommonIAdministrativeAreaLevel2Repository>(
        CommonIAdministrativeAreaLevel2Repository,
      )
    );
  });

  describe('main', () => {
    test('CommonPaginateAdministrativeAreasLevel2QueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an administrativeAreasLevel2 paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new CommonPaginateAdministrativeAreasLevel2Query({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
