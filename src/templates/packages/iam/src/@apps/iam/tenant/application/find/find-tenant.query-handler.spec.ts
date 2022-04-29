import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindTenantQueryHandler } from './find-tenant.query-handler';
import { MockTenantRepository } from '../../../../../@apps/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { ITenantRepository } from '../../../../../@apps/iam/tenant/domain/tenant.repository';
import { TenantMapper } from '../../../../../@apps/iam/tenant/domain/tenant.mapper';
import { FindTenantQuery } from './find-tenant.query';
import { FindTenantService } from './find-tenant.service';

describe('FindTenantQueryHandler', () =>
{
    let queryHandler: FindTenantQueryHandler;
    let service: FindTenantService;
    let repository: MockTenantRepository;
    let mapper: TenantMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindTenantQueryHandler,
                {
                    provide : ITenantRepository,
                    useClass: MockTenantRepository
                },
                {
                    provide : FindTenantService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindTenantQueryHandler>(FindTenantQueryHandler);
        service         = module.get<FindTenantService>(FindTenantService);
        repository      = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        mapper          = new TenantMapper();
    });

    describe('main', () =>
    {
        test('FindTenantQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an tenant founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindTenantQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});