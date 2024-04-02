import { IamITenantRepository, IamMockTenantRepository, IamSumTenantQuery } from '@app/iam/tenant';
import { IamSumTenantQueryHandler } from '@app/iam/tenant/application/sum/iam-sum-tenant.query-handler';
import { IamSumTenantService } from '@app/iam/tenant/application/sum/iam-sum-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumTenantQueryHandler', () =>
{
    let queryHandler: IamSumTenantQueryHandler;
    let service: IamSumTenantService;
    let repository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamSumTenantQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamSumTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamSumTenantQueryHandler>(IamSumTenantQueryHandler);
        service = module.get<IamSumTenantService>(IamSumTenantService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
    });

    describe('main', () =>
    {
        test('IamSumTenantQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new IamSumTenantQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
