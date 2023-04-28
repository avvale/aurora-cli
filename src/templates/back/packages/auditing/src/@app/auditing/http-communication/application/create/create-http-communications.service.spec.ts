/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateHttpCommunicationsService } from './create-http-communications.service';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('CreateHttpCommunicationsService', () =>
{
    let service: CreateHttpCommunicationsService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateHttpCommunicationsService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CreateHttpCommunicationsService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('CreateHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create httpCommunications and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});