import { IamITenantAccountRepository, IamMaxTenantAccountQuery, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamMaxTenantAccountQueryHandler } from '@app/iam/tenant-account/application/max/iam-max-tenant-account.query-handler';
import { IamMaxTenantAccountService } from '@app/iam/tenant-account/application/max/iam-max-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxTenantAccountQueryHandler', () =>
{
    let queryHandler: IamMaxTenantAccountQueryHandler;
    let service: IamMaxTenantAccountService;
    let repository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxTenantAccountQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamMaxTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxTenantAccountQueryHandler>(IamMaxTenantAccountQueryHandler);
        service = module.get<IamMaxTenantAccountService>(IamMaxTenantAccountService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMaxTenantAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxTenantAccountQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
