import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTenantByIdQueryHandler } from './find-tenant-by-id.query-handler';
import { MockTenantRepository } from '../../../../../@apps/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { ITenantRepository } from '../../../../../@apps/iam/tenant/domain/tenant.repository';
import { TenantMapper } from '../../../../../@apps/iam/tenant/domain/tenant.mapper';
import { FindTenantByIdQuery } from './find-tenant-by-id.query';
import { FindTenantByIdService } from './find-tenant-by-id.service';

describe('FindTenantByIdQueryHandler', () =>
{
    let queryHandler: FindTenantByIdQueryHandler;
    let service: FindTenantByIdService;
    let repository: MockTenantRepository;
    let mapper: TenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTenantByIdQueryHandler,
                {
                    provide : ITenantRepository,
                    useClass: MockTenantRepository
                },
                {
                    provide : FindTenantByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindTenantByIdQueryHandler>(FindTenantByIdQueryHandler);
        service         = module.get<FindTenantByIdService>(FindTenantByIdService);
        repository      = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        mapper          = new TenantMapper();
    });

    describe('main', () =>
    {
        test('FindTenantByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenant founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindTenantByIdQuery(
                    tenants[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});