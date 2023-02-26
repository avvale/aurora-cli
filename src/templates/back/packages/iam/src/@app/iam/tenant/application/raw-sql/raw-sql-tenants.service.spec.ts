import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLTenantsService } from './raw-sql-tenants.service';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('RawSQLTenantsService', () =>
{
    let service: RawSQLTenantsService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLTenantsService,
                MockTenantRepository,
                {
                    provide : ITenantRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLTenantsService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('RawSQLTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get tenants', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});