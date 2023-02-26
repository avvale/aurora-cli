import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLClientsService } from './raw-sql-clients.service';
import { IClientRepository } from '../../domain/client.repository';
import { MockClientRepository } from '../../infrastructure/mock/mock-client.repository';

describe('RawSQLClientsService', () =>
{
    let service: RawSQLClientsService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLClientsService,
                MockClientRepository,
                {
                    provide : IClientRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLClientsService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () =>
    {
        test('RawSQLClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get clients', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});