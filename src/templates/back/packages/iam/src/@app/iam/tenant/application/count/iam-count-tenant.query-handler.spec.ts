import { IamCountTenantQuery, IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamCountTenantQueryHandler } from '@app/iam/tenant/application/count/iam-count-tenant.query-handler';
import { IamCountTenantService } from '@app/iam/tenant/application/count/iam-count-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTenantQueryHandler', () =>
{
    let queryHandler: IamCountTenantQueryHandler;
    let service: IamCountTenantService;
    let repository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCountTenantQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamCountTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamCountTenantQueryHandler>(IamCountTenantQueryHandler);
        service = module.get<IamCountTenantService>(IamCountTenantService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
    });

    describe('main', () =>
    {
        test('IamCountTenantQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new IamCountTenantQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
