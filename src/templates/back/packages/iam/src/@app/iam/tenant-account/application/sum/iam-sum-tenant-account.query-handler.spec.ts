import { IamITenantAccountRepository, IamMockTenantAccountRepository, IamSumTenantAccountQuery } from '@app/iam/tenant-account';
import { IamSumTenantAccountQueryHandler } from '@app/iam/tenant-account/application/sum/iam-sum-tenant-account.query-handler';
import { IamSumTenantAccountService } from '@app/iam/tenant-account/application/sum/iam-sum-tenant-account.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumTenantAccountQueryHandler', () =>
{
    let queryHandler: IamSumTenantAccountQueryHandler;
    let service: IamSumTenantAccountService;
    let repository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumTenantAccountQueryHandler,
                {
                    provide : IamITenantAccountRepository,
                    useClass: IamMockTenantAccountRepository,
                },
                {
                    provide : IamSumTenantAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumTenantAccountQueryHandler>(IamSumTenantAccountQueryHandler);
        service = module.get<IamSumTenantAccountService>(IamSumTenantAccountService);
        repository = <IamMockTenantAccountRepository>module.get<IamITenantAccountRepository>(IamITenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamSumTenantAccountQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumTenantAccountQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
