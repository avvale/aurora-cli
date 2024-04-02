import { IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamSumRoleAccountService } from '@app/iam/role-account/application/sum/iam-sum-role-account.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamSumRoleAccountService', () =>
{
    let service: IamSumRoleAccountService;
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
                IamSumRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamSumRoleAccountService);
        repository = module.get(IamIRoleAccountRepository);
        mockRepository = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamSumRoleAccountService should be defined', () =>
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
