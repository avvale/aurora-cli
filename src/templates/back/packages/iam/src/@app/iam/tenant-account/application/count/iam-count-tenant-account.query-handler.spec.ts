import { IamCountTenantAccountQuery, IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamCountTenantAccountQueryHandler } from '@app/iam/tenant-account/application/count/iam-count-tenant-account.query-handler';
import { IamCountTenantAccountService } from '@app/iam/tenant-account/application/count/iam-count-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTenantAccountQueryHandler', () =>
{
    let queryHandler: IamCountTenantAccountQueryHandler;
    let service: IamCountTenantAccountService;
    let repository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountTenantAccountQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamCountTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountTenantAccountQueryHandler>(IamCountTenantAccountQueryHandler);
        service = module.get<IamCountTenantAccountService>(IamCountTenantAccountService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamCountTenantAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountTenantAccountQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
