import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { IamGetAccountsService } from './iam-get-accounts.service';
import { IamIAccountRepository } from '../../domain/iam-account.repository';
import { IamMockAccountRepository } from '../../infrastructure/mock/iam-mock-account.repository';

describe('IamGetAccountsService', () =>
{
    let service: IamGetAccountsService;
    let repository: IamIAccountRepository;
    let mockRepository: IamMockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                IamGetAccountsService,
                IamMockAccountRepository,
                {
                    provide : IamIAccountRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(IamGetAccountsService);
        repository = module.get(IamIAccountRepository);
        mockRepository = module.get(IamMockAccountRepository);
    });

    describe('main', () =>
    {
        test('GetAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get accounts', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
