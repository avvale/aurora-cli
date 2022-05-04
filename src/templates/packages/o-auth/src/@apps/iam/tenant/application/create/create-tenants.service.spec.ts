/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateTenantsService } from './create-tenants.service';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('CreateTenantsService', () =>
{
    let service: CreateTenantsService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateTenantsService,
                MockTenantRepository,
                {
                    provide : ITenantRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(CreateTenantsService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('CreateTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create tenants and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});