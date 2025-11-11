import {
    IamIAccountRepository,
    IamMockAccountRepository,
} from '@app/iam/account';
import { IamCountAccountService } from '@app/iam/account/application/count/iam-count-account.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCountAccountService', () => {
    let service: IamCountAccountService;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamCountAccountService,
                IamMockAccountRepository,
                {
                    provide: IamIAccountRepository,
                    useValue: {
                        count: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(IamCountAccountService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () => {
        test('IamCountAccountService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () => {
            jest.spyOn(repository, 'count').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource.length),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource.length,
            );
        });
    });
});
