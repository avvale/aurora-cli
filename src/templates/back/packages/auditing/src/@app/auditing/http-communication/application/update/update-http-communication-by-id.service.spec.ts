/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { UpdateHttpCommunicationByIdService } from './update-http-communication-by-id.service';
import {
    HttpCommunicationId,
    HttpCommunicationTags,
    HttpCommunicationEvent,
    HttpCommunicationStatus,
    HttpCommunicationMethod,
    HttpCommunicationUrl,
    HttpCommunicationHttpRequest,
    HttpCommunicationHttpRequestRejected,
    HttpCommunicationHttpResponse,
    HttpCommunicationHttpResponseRejected,
    HttpCommunicationIsReprocessing,
    HttpCommunicationReprocessingHttpCommunicationId,
    HttpCommunicationCreatedAt,
    HttpCommunicationUpdatedAt,
    HttpCommunicationDeletedAt,
} from '../../domain/value-objects';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { MockHttpCommunicationRepository } from '../../infrastructure/mock/mock-http-communication.repository';

describe('UpdateHttpCommunicationByIdService', () =>
{
    let service: UpdateHttpCommunicationByIdService;
    let repository: IHttpCommunicationRepository;
    let mockRepository: MockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateHttpCommunicationByIdService,
                MockHttpCommunicationRepository,
                {
                    provide : IHttpCommunicationRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpdateHttpCommunicationByIdService);
        repository = module.get(IHttpCommunicationRepository);
        mockRepository = module.get(MockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('UpdateHttpCommunicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a httpCommunication and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new HttpCommunicationId(httpCommunications[0].id),
                    tags: new HttpCommunicationTags(httpCommunications[0].tags),
                    event: new HttpCommunicationEvent(httpCommunications[0].event),
                    status: new HttpCommunicationStatus(httpCommunications[0].status),
                    method: new HttpCommunicationMethod(httpCommunications[0].method),
                    url: new HttpCommunicationUrl(httpCommunications[0].url),
                    httpRequest: new HttpCommunicationHttpRequest(httpCommunications[0].httpRequest),
                    httpRequestRejected: new HttpCommunicationHttpRequestRejected(httpCommunications[0].httpRequestRejected),
                    httpResponse: new HttpCommunicationHttpResponse(httpCommunications[0].httpResponse),
                    httpResponseRejected: new HttpCommunicationHttpResponseRejected(httpCommunications[0].httpResponseRejected),
                    isReprocessing: new HttpCommunicationIsReprocessing(httpCommunications[0].isReprocessing),
                    reprocessingHttpCommunicationId: new HttpCommunicationReprocessingHttpCommunicationId(httpCommunications[0].reprocessingHttpCommunicationId),
                },
            )).toBe(undefined);
        });
    });
});