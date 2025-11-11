import {
    IamIAccountRepository,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamGetAccountsService } from '@app/iam/account/application/get/iam-get-accounts.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetAccountsService', () => {
    let service: IamGetAccountsService;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetAccountsService,
                IamMockAccountRepository,
                {
                    provide: IamIAccountRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamGetAccountsService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () => {
        test('GetAccountsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get accounts', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
