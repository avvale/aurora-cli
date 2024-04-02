import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamMaxTenantService } from '@app/iam/tenant/application/max/iam-max-tenant.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxTenantService', () =>
{
    let service: IamMaxTenantService;
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
                IamMaxTenantService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxTenantService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('IamMaxTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
