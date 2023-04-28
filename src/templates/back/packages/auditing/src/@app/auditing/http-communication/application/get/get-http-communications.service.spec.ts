import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetHttpCommunicationsService } from './get-http-communications.service';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('GetHttpCommunicationsService', () =>
{
    let service: GetHttpCommunicationsService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetHttpCommunicationsService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(GetHttpCommunicationsService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('GetHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get httpCommunications', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});