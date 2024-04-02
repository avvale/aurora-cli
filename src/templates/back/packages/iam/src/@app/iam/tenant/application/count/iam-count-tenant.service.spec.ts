import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamCountTenantService } from '@app/iam/tenant/application/count/iam-count-tenant.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTenantService', () =>
{
    let service: IamCountTenantService;
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
                IamCountTenantService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountTenantService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('IamCountTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
