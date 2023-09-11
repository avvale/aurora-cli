import { IamITenantAccountRepository, IamMockTenantAccountRepository, IamRawSQLTenantsAccountsQuery, IamTenantAccountMapper } from '@app/iam/tenant-account';
import { IamRawSQLTenantsAccountsQueryHandler } from '@app/iam/tenant-account/application/raw-sql/iam-raw-sql-tenants-accounts.query-handler';
import { IamRawSQLTenantsAccountsService } from '@app/iam/tenant-account/application/raw-sql/iam-raw-sql-tenants-accounts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLTenantsAccountsQueryHandler', () =>
{
    let queryHandler: IamRawSQLTenantsAccountsQueryHandler;
    let service: IamRawSQLTenantsAccountsService;
    let repository: IamMockTenantAccountRepository;
    let mapper: IamTenantAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLTenantsAccountsQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamRawSQLTenantsAccountsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLTenantsAccountsQueryHandler>(IamRawSQLTenantsAccountsQueryHandler);
        service = module.get<IamRawSQLTenantsAccountsService>(IamRawSQLTenantsAccountsService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
        mapper = new IamTenantAccountMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLTenantsAccountsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenantsAccounts founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLTenantsAccountsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
