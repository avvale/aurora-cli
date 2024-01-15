import { auditingMockHttpCommunicationData, AuditingUpdateHttpCommunicationByIdCommand } from '@app/auditing/http-communication';
import { AuditingUpdateHttpCommunicationByIdCommandHandler } from '@app/auditing/http-communication/application/update/auditing-update-http-communication-by-id.command-handler';
import { AuditingUpdateHttpCommunicationByIdService } from '@app/auditing/http-communication/application/update/auditing-update-http-communication-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationByIdCommandHandler', () =>
{
    let commandHandler: AuditingUpdateHttpCommunicationByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateHttpCommunicationByIdCommandHandler,
                {
                    provide : AuditingUpdateHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpdateHttpCommunicationByIdCommandHandler>(AuditingUpdateHttpCommunicationByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateHttpCommunicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an httpCommunication created', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingUpdateHttpCommunicationByIdCommand(
                    {
                        id: auditingMockHttpCommunicationData[0].id,
                        tags: auditingMockHttpCommunicationData[0].tags,
                        event: auditingMockHttpCommunicationData[0].event,
                        status: auditingMockHttpCommunicationData[0].status,
                        method: auditingMockHttpCommunicationData[0].method,
                        url: auditingMockHttpCommunicationData[0].url,
                        httpRequest: auditingMockHttpCommunicationData[0].httpRequest,
                        httpRequestRejected: auditingMockHttpCommunicationData[0].httpRequestRejected,
                        httpResponse: auditingMockHttpCommunicationData[0].httpResponse,
                        httpResponseRejected: auditingMockHttpCommunicationData[0].httpResponseRejected,
                        isReprocessing: auditingMockHttpCommunicationData[0].isReprocessing,
                        reprocessingHttpCommunicationId: auditingMockHttpCommunicationData[0].reprocessingHttpCommunicationId,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
