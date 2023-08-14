import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetTenantsQueryHandler } from './iam-get-tenants.query-handler';
import { IamMockTenantRepository } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.repository';
import { IamITenantRepository } from '@app/iam/tenant/domain/iam-tenant.repository';
import { IamTenantMapper } from '@app/iam/tenant/domain/iam-tenant.mapper';
import { IamGetTenantsQuery } from './iam-get-tenants.query';
import { IamGetTenantsService } from './iam-get-tenants.service';

describe('GetTenantsQueryHandler', () =>
{
    let queryHandler: IamGetTenantsQueryHandler;
    let service: IamGetTenantsService;
    let repository: IamMockTenantRepository;
    let mapper: IamTenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamGetTenantsQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamGetTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamGetTenantsQueryHandler>(IamGetTenantsQueryHandler);
        service = module.get<IamGetTenantsService>(IamGetTenantsService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
        mapper = new IamTenantMapper();
    });

    describe('main', () =>
    {
        test('IamGetTenantsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamGetTenantsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});