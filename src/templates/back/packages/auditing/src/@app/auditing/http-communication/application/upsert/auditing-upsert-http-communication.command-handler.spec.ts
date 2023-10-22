import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingUpsertHttpCommunicationCommandHandler } from './auditing-upsert-http-communication.command-handler';
import { AuditingUpsertHttpCommunicationCommand } from './auditing-upsert-http-communication.command';
import { AuditingUpsertHttpCommunicationService } from './auditing-upsert-http-communication.service';

describe('AuditingUpsertHttpCommunicationCommandHandler', () =>
{
    let commandHandler: AuditingUpsertHttpCommunicationCommandHandler;
    let service: AuditingUpsertHttpCommunicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditingUpsertHttpCommunicationCommandHandler,
                {
                    provide : AuditingUpsertHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<AuditingUpsertHttpCommunicationCommandHandler>(AuditingUpsertHttpCommunicationCommandHandler);
        service = module.get<AuditingUpsertHttpCommunicationService>(AuditingUpsertHttpCommunicationService);
    });

    describe('main', () =>
    {
        test('UpsertHttpCommunicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the AuditingUpsertHttpCommunicationService', async () =>
        {
            expect(await commandHandler.execute(
                new AuditingUpsertHttpCommunicationCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
