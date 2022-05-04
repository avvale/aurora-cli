/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteTenantsService } from './delete-tenants.service';
import { ITenantRepository } from '../../domain/tenant.repository';
import { MockTenantRepository } from '../../infrastructure/mock/mock-tenant.repository';

describe('DeleteTenantsService', () =>
{
    let service: DeleteTenantsService;
    let repository: ITenantRepository;
    let mockRepository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteTenantsService,
                MockTenantRepository,
                {
                    provide : ITenantRepository,
                    useValue: {
                        get   : (queryStatement) => { /**/ },
                        delete: (queryStatement) => { /**/ },
                    }
                },
            ],
        }).compile();

        service         = module.get(DeleteTenantsService);
        repository      = module.get(ITenantRepository);
        mockRepository  = module.get(MockTenantRepository);
    });

    describe('main', () =>
    {
        test('DeleteTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete tenant and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});