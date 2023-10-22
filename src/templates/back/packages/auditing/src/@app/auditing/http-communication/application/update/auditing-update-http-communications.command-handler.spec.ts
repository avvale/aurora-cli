import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingUpdateHttpCommunicationsCommandHandler } from './auditing-update-http-communications.command-handler';
import { AuditingUpdateHttpCommunicationsCommand } from './auditing-update-http-communications.command';
import { AuditingUpdateHttpCommunicationsService } from './auditing-update-http-communications.service';

describe('AuditingUpdateHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: AuditingUpdateHttpCommunicationsCommandHandler;
    let service: AuditingUpdateHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpdateHttpCommunicationsCommandHandler,
                {
                    provide : AuditingUpdateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpdateHttpCommunicationsCommandHandler>(AuditingUpdateHttpCommunicationsCommandHandler);
        service = module.get<AuditingUpdateHttpCommunicationsService>(AuditingUpdateHttpCommunicationsService);
    });

    describe('main', () =>
    {
        test('UpdateHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an httpCommunications updated', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingUpdateHttpCommunicationsCommand(
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
        });
    });
});
