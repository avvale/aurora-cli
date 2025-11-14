import {
    auditingMockHttpCommunicationData,
    AuditingUpdateHttpCommunicationsCommand,
} from '@app/auditing/http-communication';
import { AuditingUpdateHttpCommunicationsCommandHandler } from '@app/auditing/http-communication/application/update/auditing-update-http-communications.command-handler';
import { AuditingUpdateHttpCommunicationsService } from '@app/auditing/http-communication/application/update/auditing-update-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationsCommandHandler', () => {
    let commandHandler: AuditingUpdateHttpCommunicationsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateHttpCommunicationsCommandHandler,
                {
                    provide: AuditingUpdateHttpCommunicationsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<AuditingUpdateHttpCommunicationsCommandHandler>(
                AuditingUpdateHttpCommunicationsCommandHandler,
            );
    });

    describe('main', () => {
        test('UpdateHttpCommunicationsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an httpCommunications updated', async () => {
            expect(
                await commandHandler.execute(
                    new AuditingUpdateHttpCommunicationsCommand(
                        {
                            id: auditingMockHttpCommunicationData[0].id,
                            rowId: auditingMockHttpCommunicationData[0].rowId,
                            tags: auditingMockHttpCommunicationData[0].tags,
                            event: auditingMockHttpCommunicationData[0].event,
                            status: auditingMockHttpCommunicationData[0].status,
                            method: auditingMockHttpCommunicationData[0].method,
                            url: auditingMockHttpCommunicationData[0].url,
                            httpRequest:
                                auditingMockHttpCommunicationData[0]
                                    .httpRequest,
                            httpRequestRejected:
                                auditingMockHttpCommunicationData[0]
                                    .httpRequestRejected,
                            httpResponse:
                                auditingMockHttpCommunicationData[0]
                                    .httpResponse,
                            httpResponseRejected:
                                auditingMockHttpCommunicationData[0]
                                    .httpResponseRejected,
                            isReprocessing:
                                auditingMockHttpCommunicationData[0]
                                    .isReprocessing,
                            reprocessingHttpCommunicationId:
                                auditingMockHttpCommunicationData[0]
                                    .reprocessingHttpCommunicationId,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
