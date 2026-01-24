import {
  IamGetTenantsAccountsQuery,
  IamITenantAccountRepository,
  IamMockTenantAccountRepository,
  IamTenantAccountMapper,
} from '@app/iam/tenant-account';
import { IamGetTenantsAccountsQueryHandler } from '@app/iam/tenant-account/application/get/iam-get-tenants-accounts.query-handler';
import { IamGetTenantsAccountsService } from '@app/iam/tenant-account/application/get/iam-get-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetTenantsAccountsQueryHandler', () => {
  let queryHandler: IamGetTenantsAccountsQueryHandler;
  let service: IamGetTenantsAccountsService;
  let repository: IamMockTenantAccountRepository;
  let mapper: IamTenantAccountMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamGetTenantsAccountsQueryHandler,
        {
          provide: IamITenantAccountRepository,
          useClass: IamMockTenantAccountRepository,
        },
        {
          provide: IamGetTenantsAccountsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<IamGetTenantsAccountsQueryHandler>(
      IamGetTenantsAccountsQueryHandler,
    );
    service = module.get<IamGetTenantsAccountsService>(
      IamGetTenantsAccountsService,
    );
    repository = <IamMockTenantAccountRepository>(
      module.get<IamITenantAccountRepository>(IamITenantAccountRepository)
    );
    mapper = new IamTenantAccountMapper();
  });

  describe('main', () => {
    test('IamGetTenantsAccountsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an tenantsAccounts founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(repository.collectionSource)),
        );
      expect(
        await queryHandler.execute(new IamGetTenantsAccountsQuery()),
      ).toStrictEqual(
        mapper.mapAggregatesToResponses(repository.collectionSource),
      );
    });
  });
});
