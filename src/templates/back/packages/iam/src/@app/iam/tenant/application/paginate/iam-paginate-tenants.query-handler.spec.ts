import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { IamPaginateTenantsQueryHandler } from './iam-paginate-tenants.query-handler';
import { IamMockTenantRepository } from '@app/iam/tenant/infrastructure/mock/iam-mock-tenant.repository';
import { IamITenantRepository } from '@app/iam/tenant/domain/iam-tenant.repository';
import { IamTenantMapper } from '@app/iam/tenant/domain/iam-tenant.mapper';
import { IamPaginateTenantsQuery } from './iam-paginate-tenants.query';
import { IamPaginateTenantsService } from './iam-paginate-tenants.service';

describe('IamPaginateTenantsQueryHandler', () =>
{
    let queryHandler: IamPaginateTenantsQueryHandler;
    let service: IamPaginateTenantsService;
    let repository: IamMockTenantRepository;
    let mapper: IamTenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamPaginateTenantsQueryHandler,
                {
                    provide : IamITenantRepository,
                    useClass: IamMockTenantRepository,
                },
                {
                    provide : IamPaginateTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<IamPaginateTenantsQueryHandler>(IamPaginateTenantsQueryHandler);
        service = module.get<IamPaginateTenantsService>(IamPaginateTenantsService);
        repository = <IamMockTenantRepository>module.get<IamITenantRepository>(IamITenantRepository);
        mapper = new IamTenantMapper();
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenants paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new IamPaginateTenantsQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
