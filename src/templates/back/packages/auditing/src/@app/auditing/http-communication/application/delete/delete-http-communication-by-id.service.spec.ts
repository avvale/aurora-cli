/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { DeleteHttpCommunicationByIdService } from './delete-http-communication-by-id.service';
import { HttpCommunicationId } from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('DeleteHttpCommunicationByIdService', () =>
{
    let service: DeleteHttpCommunicationByIdService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteHttpCommunicationByIdService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteHttpCommunicationByIdService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('DeleteHttpCommunicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete httpCommunication and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new HttpCommunicationId(httpCommunications[0].id),
            )).toBe(undefined);
        });
    });
});