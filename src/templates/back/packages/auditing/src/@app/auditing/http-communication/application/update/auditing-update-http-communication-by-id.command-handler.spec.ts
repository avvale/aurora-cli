import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingUpdateHttpCommunicationByIdCommandHandler } from './auditing-update-http-communication-by-id.command-handler';
import { AuditingUpdateHttpCommunicationByIdCommand } from './auditing-update-http-communication-by-id.command';
import { AuditingUpdateHttpCommunicationByIdService } from './auditing-update-http-communication-by-id.service';

describe('AuditingUpdateHttpCommunicationByIdCommandHandler', () =>
{
    let commandHandler: AuditingUpdateHttpCommunicationByIdCommandHandler;
    let service: AuditingUpdateHttpCommunicationByIdService;

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
        service = module.get<AuditingUpdateHttpCommunicationByIdService>(AuditingUpdateHttpCommunicationByIdService);
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
