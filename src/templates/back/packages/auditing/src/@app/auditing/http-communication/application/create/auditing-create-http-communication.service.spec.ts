/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AuditingIHttpCommunicationRepository,
    auditingMockHttpCommunicationData,
    AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingCreateHttpCommunicationService } from '@app/auditing/http-communication/application/create/auditing-create-http-communication.service';
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
    AuditingHttpCommunicationRowId,
    AuditingHttpCommunicationStatus,
    AuditingHttpCommunicationTags,
    AuditingHttpCommunicationUrl,
} from '@app/auditing/http-communication/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationService', () => {
    let service: AuditingCreateHttpCommunicationService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingCreateHttpCommunicationService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide: AuditingIHttpCommunicationRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(AuditingCreateHttpCommunicationService);
    });

    describe('main', () => {
        test('AuditingCreateHttpCommunicationService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a httpCommunication and emit event', async () => {
            expect(
                await service.main({
                    id: new AuditingHttpCommunicationId(
                        auditingMockHttpCommunicationData[0].id,
                    ),
                    rowId: new AuditingHttpCommunicationRowId(
                        auditingMockHttpCommunicationData[0].rowId,
                    ),
                    tags: new AuditingHttpCommunicationTags(
                        auditingMockHttpCommunicationData[0].tags,
                    ),
                    event: new AuditingHttpCommunicationEvent(
                        auditingMockHttpCommunicationData[0].event,
                    ),
                    status: new AuditingHttpCommunicationStatus(
                        auditingMockHttpCommunicationData[0].status,
                    ),
                    method: new AuditingHttpCommunicationMethod(
                        auditingMockHttpCommunicationData[0].method,
                    ),
                    url: new AuditingHttpCommunicationUrl(
                        auditingMockHttpCommunicationData[0].url,
                    ),
                    httpRequest: new AuditingHttpCommunicationHttpRequest(
                        auditingMockHttpCommunicationData[0].httpRequest,
                    ),
                    httpRequestRejected:
                        new AuditingHttpCommunicationHttpRequestRejected(
                            auditingMockHttpCommunicationData[0].httpRequestRejected,
                        ),
                    httpResponse: new AuditingHttpCommunicationHttpResponse(
                        auditingMockHttpCommunicationData[0].httpResponse,
                    ),
                    httpResponseRejected:
                        new AuditingHttpCommunicationHttpResponseRejected(
                            auditingMockHttpCommunicationData[0].httpResponseRejected,
                        ),
                    isReprocessing: new AuditingHttpCommunicationIsReprocessing(
                        auditingMockHttpCommunicationData[0].isReprocessing,
                    ),
                    reprocessingHttpCommunicationId:
                        new AuditingHttpCommunicationReprocessingHttpCommunicationId(
                            auditingMockHttpCommunicationData[0].reprocessingHttpCommunicationId,
                        ),
                }),
            ).toBe(undefined);
        });
    });
});
