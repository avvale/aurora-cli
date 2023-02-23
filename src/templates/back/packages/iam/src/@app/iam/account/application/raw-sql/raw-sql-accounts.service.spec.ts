import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLAccountsService } from './raw-sql-accounts.service';
import { IAccountRepository } from '../../domain/account.repository';
import { MockAccountRepository } from '../../infrastructure/mock/mock-account.repository';

describe('RawSQLAccountsService', () =>
{
    let service: RawSQLAccountsService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLAccountsService,
                MockAccountRepository,
                {
                    provide : IAccountRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLAccountsService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get accounts', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});