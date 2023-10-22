/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingUpdateHttpCommunicationsService } from './auditing-update-http-communications.service';
import {
    AuditingHttpCommunicationId,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationEvent,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationMethod,
    AuditingHttpCommunicationUrl,
    AuditingHttpCommunicationHttpRequest,
    AuditingHttpCommunicationHttpRequestRejected,
    AuditingHttpCommunicationHttpResponse,
    AuditingHttpCommunicationHttpResponseRejected,
    AuditingHttpCommunicationIsReprocessing,
    AuditingHttpCommunicationReprocessingHttpCommunicationId,
    AuditingHttpCommunicationCreatedAt,
    AuditingHttpCommunicationUpdatedAt,
    AuditingHttpCommunicationDeletedAt,
} from '../../domain/value-objects';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingMockHttpCommunicationRepository } from '../../infrastructure/mock/auditing-mock-http-communication.repository';

describe('AuditingUpdateHttpCommunicationsService', () =>
{
    let service: AuditingUpdateHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingUpdateHttpCommunicationsService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingUpdateHttpCommunicationsService);
    });

    describe('main', () =>
    {
        test('UpdateHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a httpCommunications and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AuditingHttpCommunicationId(auditingMockHttpCommunicationData[0].id),
                        tags: new AuditingHttpCommunicationTags(auditingMockHttpCommunicationData[0].tags),
                        event: new AuditingHttpCommunicationEvent(auditingMockHttpCommunicationData[0].event),
                        status: new AuditingHttpCommunicationStatus(auditingMockHttpCommunicationData[0].status),
                        method: new AuditingHttpCommunicationMethod(auditingMockHttpCommunicationData[0].method),
                        url: new AuditingHttpCommunicationUrl(auditingMockHttpCommunicationData[0].url),
                        httpRequest: new AuditingHttpCommunicationHttpRequest(auditingMockHttpCommunicationData[0].httpRequest),
                        httpRequestRejected: new AuditingHttpCommunicationHttpRequestRejected(auditingMockHttpCommunicationData[0].httpRequestRejected),
                        httpResponse: new AuditingHttpCommunicationHttpResponse(auditingMockHttpCommunicationData[0].httpResponse),
                        httpResponseRejected: new AuditingHttpCommunicationHttpResponseRejected(auditingMockHttpCommunicationData[0].httpResponseRejected),
                        isReprocessing: new AuditingHttpCommunicationIsReprocessing(auditingMockHttpCommunicationData[0].isReprocessing),
                        reprocessingHttpCommunicationId: new AuditingHttpCommunicationReprocessingHttpCommunicationId(auditingMockHttpCommunicationData[0].reprocessingHttpCommunicationId),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
