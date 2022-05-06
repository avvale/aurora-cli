/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { clients } from '../../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';
import { DeleteClientByIdService } from './delete-client-by-id.service';
import { ClientId } from '../../domain/value-objects';
import { IClientRepository } from '../../domain/client.repository';
import { MockClientRepository } from '../../infrastructure/mock/mock-client.repository';

describe('DeleteClientByIdService', () =>
{
    let service: DeleteClientByIdService;
    let repository: IClientRepository;
    let mockRepository: MockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteClientByIdService,
                MockClientRepository,
                {
                    provide : IClientRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteClientByIdService);
        repository      = module.get(IClientRepository);
        mockRepository  = module.get(MockClientRepository);
    });

    describe('main', () =>
    {
        test('DeleteClientByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete client and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new ClientId(clients[0].id),
            )).toBe(undefined);
        });
    });
});