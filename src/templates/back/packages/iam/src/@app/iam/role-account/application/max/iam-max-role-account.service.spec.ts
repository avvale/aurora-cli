import { IamIRoleAccountRepository, IamMockRoleAccountRepository } from '@app/iam/role-account';
import { IamMaxRoleAccountService } from '@app/iam/role-account/application/max/iam-max-role-account.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamMaxRoleAccountService', () =>
{
    let service: IamMaxRoleAccountService;
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
                IamMaxRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide : IamIRoleAccountRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamMaxRoleAccountService);
        repository = module.get(IamIRoleAccountRepository);
        mockRepository = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () =>
    {
        test('IamMaxRoleAccountService should be defined', () =>
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
