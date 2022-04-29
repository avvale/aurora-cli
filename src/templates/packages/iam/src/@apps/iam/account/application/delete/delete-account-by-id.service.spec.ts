/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accounts } from '../../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { DeleteAccountByIdService } from './delete-account-by-id.service';
import { AccountId } from '../../domain/value-objects';
import { IAccountRepository } from '../../domain/account.repository';
import { MockAccountRepository } from '../../infrastructure/mock/mock-account.repository';

describe('DeleteAccountByIdService', () =>
{
    let service: DeleteAccountByIdService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAccountByIdService,
                MockAccountRepository,
                {
                    provide : IAccountRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(DeleteAccountByIdService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('DeleteAccountByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete account and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AccountId(accounts[0].id)
            )).toBe(undefined);
        });
    });
});