import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';
import { FindHttpCommunicationByIdService } from './find-http-communication-by-id.service';
import { HttpCommunicationId } from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('FindHttpCommunicationByIdService', () =>
{
    let service: FindHttpCommunicationByIdService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindHttpCommunicationByIdService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindHttpCommunicationByIdService);
        repository      = module.get(IHttpCommunicationRepository);
        mockRepository  = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find httpCommunication by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new HttpCommunicationId(httpCommunications[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});