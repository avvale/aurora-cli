import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamGetTenantsService } from './iam-get-tenants.service';
import { IamITenantRepository } from '../../domain/iam-tenant.repository';
import { IamMockTenantRepository } from '../../infrastructure/mock/iam-mock-tenant.repository';

describe('IamGetTenantsService', () =>
{
    let service: IamGetTenantsService;
    let repository: IamITenantRepository;
    let mockRepository: IamMockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetTenantsService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetTenantsService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('GetTenantsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get tenants', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
