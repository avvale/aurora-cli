/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingIHttpCommunicationRepository, auditingMockHttpCommunicationData, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingUpsertHttpCommunicationService } from '@app/auditing/http-communication/application/upsert/auditing-upsert-http-communication.service';
import {
    AuditingHttpCommunicationEvent,
    AuditingHttpCommunicationHttpRequest,
    AuditingHttpCommunicationHttpRequestRejected,
    AuditingHttpCommunicationHttpResponse,
    AuditingHttpCommunicationHttpResponseRejected,
    AuditingHttpCommunicationId,
    AuditingHttpCommunicationIsReprocessing,
    AuditingHttpCommunicationMethod,
    AuditingHttpCommunicationReprocessingHttpCommunicationId,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpsertHttpCommunicationService', () =>

{
    let service: AuditingUpsertHttpCommunicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingUpsertHttpCommunicationService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingUpsertHttpCommunicationService);
    });

    describe('main', () =>
    {
        test('AuditingUpsertHttpCommunicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a httpCommunication and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
