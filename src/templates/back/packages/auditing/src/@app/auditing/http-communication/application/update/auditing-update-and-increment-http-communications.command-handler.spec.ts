import { auditingMockHttpCommunicationData, AuditingUpdateAndIncrementHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { AuditingUpdateAndIncrementHttpCommunicationsCommandHandler } from '@app/auditing/http-communication/application/update/auditing-update-and-increment-http-communications.command-handler';
import { AuditingUpdateAndIncrementHttpCommunicationsService } from '@app/auditing/http-communication/application/update/auditing-update-and-increment-http-communications.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateAndIncrementHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: AuditingUpdateAndIncrementHttpCommunicationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateAndIncrementHttpCommunicationsCommandHandler,
                {
                    provide : AuditingUpdateAndIncrementHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpdateAndIncrementHttpCommunicationsCommandHandler>(AuditingUpdateAndIncrementHttpCommunicationsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an httpCommunications updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new AuditingUpdateAndIncrementHttpCommunicationsCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
            /* eslint-enable key-spacing */
        });
    });
});
