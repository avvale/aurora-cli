import { IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamCountRoleAccountService } from '@app/iam/role-account/application/count/iam-count-role-account.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountRoleAccountService', () =>
{
    let service: IamCountRoleAccountService;
    let repository: IamIRoleAccountRepository;
    let mockRepository: IamMockRoleAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCountRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamCountRoleAccountService);
        repository = module.get(IamIRoleAccountRepository);
        mockRepository = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamCountRoleAccountService should be defined', () =>
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
