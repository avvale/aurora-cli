import { IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamMinTenantAccountService } from '@app/iam/tenant-account/application/min/iam-min-tenant-account.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMinTenantAccountService', () =>
{
    let service: IamMinTenantAccountService;
    let repository: IamITenantAccountRepository;
    let mockRepository: IamMockTenantAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamMinTenantAccountService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMinTenantAccountService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMinTenantAccountService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
