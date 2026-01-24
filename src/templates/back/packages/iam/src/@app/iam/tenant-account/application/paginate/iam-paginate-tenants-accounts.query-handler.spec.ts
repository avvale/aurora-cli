import {
  IamITenantAccountRepository,
  IamMockTenantAccountRepository,
  IamPaginateTenantsAccountsQuery,
} from '@app/iam/tenant-account';
import { IamPaginateTenantsAccountsQueryHandler } from '@app/iam/tenant-account/application/paginate/iam-paginate-tenants-accounts.query-handler';
import { IamPaginateTenantsAccountsService } from '@app/iam/tenant-account/application/paginate/iam-paginate-tenants-accounts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTenantsAccountsQueryHandler', () => {
  let queryHandler: IamPaginateTenantsAccountsQueryHandler;
  let service: IamPaginateTenantsAccountsService;
  let repository: IamMockTenantAccountRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamPaginateTenantsAccountsQueryHandler,
        {
          provide: IamITenantAccountRepository,
          useClass: IamMockTenantAccountRepository,
        },
        {
          provide: IamPaginateTenantsAccountsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamPaginateTenantsAccountsQueryHandler>(
      IamPaginateTenantsAccountsQueryHandler,
    );
    service = module.get<IamPaginateTenantsAccountsService>(
      IamPaginateTenantsAccountsService,
    );
    repository = <IamMockTenantAccountRepository>(
      module.get<IamITenantAccountRepository>(IamITenantAccountRepository)
    );
  });

  describe('main', () => {
    test('IamPaginateTenantsAccountsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tenantsAccounts paginated', async () => {
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
          new IamPaginateTenantsAccountsQuery({
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
