import { IamITenantRepository, IamMinTenantQuery, IamMockTenantRepository } from '@app/iam/tenant';
import { IamMinTenantQueryHandler } from '@app/iam/tenant/application/min/iam-min-tenant.query-handler';
import { IamMinTenantService } from '@app/iam/tenant/application/min/iam-min-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinTenantQueryHandler', () =>
{
    let queryHandler: IamMinTenantQueryHandler;
    let service: IamMinTenantService;
    let repository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMinTenantQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamMinTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMinTenantQueryHandler>(IamMinTenantQueryHandler);
        service = module.get<IamMinTenantService>(IamMinTenantService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
    });

    describe('main', () =>
    {
        test('IamMinTenantQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new IamMinTenantQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
