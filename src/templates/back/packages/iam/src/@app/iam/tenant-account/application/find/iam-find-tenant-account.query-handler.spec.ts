import { IamFindTenantAccountQuery, IamITenantAccountRepository, IamMockTenantAccountRepository, IamTenantAccountMapper } from '@app/iam/tenant-account';
import { IamFindTenantAccountQueryHandler } from '@app/iam/tenant-account/application/find/iam-find-tenant-account.query-handler';
import { IamFindTenantAccountService } from '@app/iam/tenant-account/application/find/iam-find-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTenantAccountQueryHandler', () =>
{
    let queryHandler: IamFindTenantAccountQueryHandler;
    let service: IamFindTenantAccountService;
    let repository: IamMockTenantAccountRepository;
    let mapper: IamTenantAccountMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamFindTenantAccountQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamFindTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamFindTenantAccountQueryHandler>(IamFindTenantAccountQueryHandler);
        service = module.get<IamFindTenantAccountService>(IamFindTenantAccountService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
        mapper = new IamTenantAccountMapper();
    });

    describe('main', () =>
    {
        test('IamFindTenantAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenantAccount founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new IamFindTenantAccountQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
