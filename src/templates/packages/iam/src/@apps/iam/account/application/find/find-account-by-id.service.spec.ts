import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { FindAccountByIdService } from './find-account-by-id.service';
import { AccountId } from '../../domain/value-objects';
import { IAccountRepository } from '../../domain/account.repository';
import { MockAccountRepository } from '../../infrastructure/mock/mock-account.repository';

describe('FindAccountByIdService', () =>
{
    let service: FindAccountByIdService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAccountByIdService,
                MockAccountRepository,
                {
                    provide: IAccountRepository,
                    useValue: {
                        findById: id => { /**/ }
                    }
                }
            ]
        }).compile();

        service         = module.get(FindAccountByIdService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('FindAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find account by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AccountId(accounts[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});