import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindClientService } from './find-client.service';
import { IClientRepository } from '../../domain/client.repository';
import { MockClientRepository } from '../../infrastructure/mock/mock-client.repository';

describe('FindClientService', () =>
{
    let service: FindClientService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindClientService,
                MockClientRepository,
                {
                    provide : IClientRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindClientService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () =>
    {
        test('FindClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find client', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});