import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockTenantRepository } from '@app/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { ITenantRepository } from '@app/iam/tenant/domain/tenant.repository';
import { TenantMapper } from '@app/iam/tenant/domain/tenant.mapper';
import { RawSQLTenantsQueryHandler } from './raw-sql-tenants.query-handler';
import { RawSQLTenantsQuery } from './raw-sql-tenants.query';
import { RawSQLTenantsService } from './raw-sql-tenants.service';

describe('RawSQLTenantsQueryHandler', () =>
{
    let queryHandler: RawSQLTenantsQueryHandler;
    let service: RawSQLTenantsService;
    let repository: MockTenantRepository;
    let mapper: TenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLTenantsQueryHandler,
                {
                    provide : ITenantRepository,
                    useClass: MockTenantRepository,
                },
                {
                    provide : RawSQLTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLTenantsQueryHandler>(RawSQLTenantsQueryHandler);
        service         = module.get<RawSQLTenantsService>(RawSQLTenantsService);
        repository      = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        mapper          = new TenantMapper();
    });

    describe('main', () =>
    {
        test('RawSQLTenantsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLTenantsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});