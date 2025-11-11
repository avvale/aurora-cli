import {
    IamIRoleAccountRepository,
    IamMockRoleAccountRepository,
} from '@app/iam/role-account';
import { IamFindRoleAccountService } from '@app/iam/role-account/application/find/iam-find-role-account.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindRoleAccountService', () => {
    let service: IamFindRoleAccountService;
    let repository: IamIRoleAccountRepository;
    let mockRepository: IamMockRoleAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamFindRoleAccountService,
                IamMockRoleAccountRepository,
                {
                    provide: IamIRoleAccountRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamFindRoleAccountService);
        repository = module.get(IamIRoleAccountRepository);
        mockRepository = module.get(IamMockRoleAccountRepository);
    });

    describe('main', () => {
        test('IamFindRoleAccountService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find roleAccount', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
