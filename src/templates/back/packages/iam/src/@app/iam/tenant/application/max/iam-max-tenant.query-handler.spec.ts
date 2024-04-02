import { IamITenantRepository, IamMaxTenantQuery, IamMockTenantRepository } from '@app/iam/tenant';
import { IamMaxTenantQueryHandler } from '@app/iam/tenant/application/max/iam-max-tenant.query-handler';
import { IamMaxTenantService } from '@app/iam/tenant/application/max/iam-max-tenant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxTenantQueryHandler', () =>
{
    let queryHandler: IamMaxTenantQueryHandler;
    let service: IamMaxTenantService;
    let repository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamMaxTenantQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamMaxTenantService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamMaxTenantQueryHandler>(IamMaxTenantQueryHandler);
        service = module.get<IamMaxTenantService>(IamMaxTenantService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
    });

    describe('main', () =>
    {
        test('IamMaxTenantQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new IamMaxTenantQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
