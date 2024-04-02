import { IamITenantAccountRepository, IamMockTenantAccountRepository } from '@app/iam/tenant-account';
import { IamCountTenantAccountService } from '@app/iam/tenant-account/application/count/iam-count-tenant-account.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountTenantAccountService', () =>
{
    let service: IamCountTenantAccountService;
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
                IamCountTenantAccountService,
                IamMockTenantAccountRepository,
                {
                    provide : IamITenantAccountRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountTenantAccountService);
        repository = module.get(IamITenantAccountRepository);
        mockRepository = module.get(IamMockTenantAccountRepository);
    });

    describe('main', () =>
    {
        test('IamCountTenantAccountService should be defined', () =>
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
