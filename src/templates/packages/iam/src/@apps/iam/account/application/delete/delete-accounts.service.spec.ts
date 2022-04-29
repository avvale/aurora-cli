/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteAccountsService } from './delete-accounts.service';
import { IAccountRepository } from '../../domain/account.repository';
import { MockAccountRepository } from '../../infrastructure/mock/mock-account.repository';

describe('DeleteAccountsService', () =>
{
    let service: DeleteAccountsService;
    let repository: IAccountRepository;
    let mockRepository: MockAccountRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAccountsService,
                MockAccountRepository,
                {
                    provide : IAccountRepository,
                    useValue: {
                        get   : (queryStatement) => { /**/ },
                        delete: (queryStatement) => { /**/ },
                    }
                },
            ],
        }).compile();

        service         = module.get(DeleteAccountsService);
        repository      = module.get(IAccountRepository);
        mockRepository  = module.get(MockAccountRepository);
    });

    describe('main', () =>
    {
        test('DeleteAccountsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete account and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});