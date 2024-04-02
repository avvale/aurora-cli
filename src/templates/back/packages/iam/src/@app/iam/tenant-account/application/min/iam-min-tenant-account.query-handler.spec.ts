import { IamITenantAccountRepository, IamMinTenantAccountQuery, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamMinTenantAccountQueryHandler } from '@app/iam/tenant-account/application/min/iam-min-tenant-account.query-handler';
import { IamMinTenantAccountService } from '@app/iam/tenant-account/application/min/iam-min-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinTenantAccountQueryHandler', () =>
{
    let queryHandler: IamMinTenantAccountQueryHandler;
    let service: IamMinTenantAccountService;
    let repository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinTenantAccountQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamMinTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinTenantAccountQueryHandler>(IamMinTenantAccountQueryHandler);
        service = module.get<IamMinTenantAccountService>(IamMinTenantAccountService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMinTenantAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinTenantAccountQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
