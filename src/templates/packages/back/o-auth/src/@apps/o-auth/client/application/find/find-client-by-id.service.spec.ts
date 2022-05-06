import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';
import { FindClientByIdService } from './find-client-by-id.service';
import { ClientId } from '../../domain/value-objects';
import { IClientRepository } from '../../domain/client.repository';
import { MockClientRepository } from '../../infrastructure/mock/mock-client.repository';

describe('FindClientByIdService', () =>
{
    let service: FindClientByIdService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindClientByIdService,
                MockClientRepository,
                {
                    provide : IClientRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindClientByIdService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () =>
    {
        test('FindClientByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find client by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ClientId(clients[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});