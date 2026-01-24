import {
  IamITenantRepository,
  IamMockTenantRepository,
  IamPaginateTenantsQuery,
} from '@app/iam/tenant';
import { IamPaginateTenantsQueryHandler } from '@app/iam/tenant/application/paginate/iam-paginate-tenants.query-handler';
import { IamPaginateTenantsService } from '@app/iam/tenant/application/paginate/iam-paginate-tenants.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsQueryHandler', () => {
  let queryHandler: IamPaginateTenantsQueryHandler;
  let service: IamPaginateTenantsService;
  let repository: IamMockTenantRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamPaginateTenantsQueryHandler,
        {
          provide: IamITenantRepository,
          useClass: IamMockTenantRepository,
        },
        {
          provide: IamPaginateTenantsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamPaginateTenantsQueryHandler>(
      IamPaginateTenantsQueryHandler,
    );
    service = module.get<IamPaginateTenantsService>(IamPaginateTenantsService);
    repository = <IamMockTenantRepository>(
      module.get<IamITenantRepository>(IamITenantRepository)
    );
  });

  describe('main', () => {
    test('IamPaginateTenantsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tenants paginated', async () => {
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
          new IamPaginateTenantsQuery({
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
