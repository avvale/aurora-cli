import { IamITenantRepository, IamMockTenantRepository } from '@app/iam/tenant';
import { IamSumTenantService } from '@app/iam/tenant/application/sum/iam-sum-tenant.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumTenantService', () =>
{
    let service: IamSumTenantService;
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
                IamSumTenantService,
                IamMockTenantRepository,
                {
                    provide : IamITenantRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamSumTenantService);
        repository = module.get(IamITenantRepository);
        mockRepository = module.get(IamMockTenantRepository);
    });

    describe('main', () =>
    {
        test('IamSumTenantService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
