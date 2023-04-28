import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindHttpCommunicationService } from './find-http-communication.service';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('FindHttpCommunicationService', () =>
{
    let service: FindHttpCommunicationService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindHttpCommunicationService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindHttpCommunicationService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find httpCommunication', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});