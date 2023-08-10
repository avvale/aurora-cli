import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamMockTenantRepository } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.repository';
import { IamITenantRepository } from '@app/iam/tenant/domain/iam-tenant.repository';
import { IamTenantMapper } from '@app/iam/tenant/domain/iam-tenant.mapper';
import { IamRawSQLTenantsQueryHandler } from './iam-raw-sql-tenants.query-handler';
import { IamRawSQLTenantsQuery } from './iam-raw-sql-tenants.query';
import { IamRawSQLTenantsService } from './iam-raw-sql-tenants.service';

describe('RawSQLTenantsQueryHandler', () =>
{
    let queryHandler: IamRawSQLTenantsQueryHandler;
    let service: IamRawSQLTenantsService;
    let repository: IamMockTenantRepository;
    let mapper: IamTenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamRawSQLTenantsQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamRawSQLTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamRawSQLTenantsQueryHandler>(IamRawSQLTenantsQueryHandler);
        service = module.get<IamRawSQLTenantsService>(IamRawSQLTenantsService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
        mapper = new IamTenantMapper();
    });

    describe('main', () =>
    {
        test('IamRawSQLTenantsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new IamRawSQLTenantsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
