import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';
import { UpsertHttpCommunicationCommandHandler } from './upsert-http-communication.command-handler';
import { UpsertHttpCommunicationCommand } from './upsert-http-communication.command';
import { UpsertHttpCommunicationService } from './upsert-http-communication.service';

describe('UpsertHttpCommunicationCommandHandler', () =>
{
    let commandHandler: UpsertHttpCommunicationCommandHandler;
    let service: UpsertHttpCommunicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertHttpCommunicationCommandHandler,
                {
                    provide : UpsertHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertHttpCommunicationCommandHandler>(UpsertHttpCommunicationCommandHandler);
        service         = module.get<UpsertHttpCommunicationService>(UpsertHttpCommunicationService);
    });

    describe('main', () =>
    {
        test('UpsertHttpCommunicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertHttpCommunicationService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertHttpCommunicationCommand(
                    {
                        id: httpCommunications[0].id,
                        code: httpCommunications[0].code,
                        event: httpCommunications[0].event,
                        status: httpCommunications[0].status,
                        method: httpCommunications[0].method,
                        url: httpCommunications[0].url,
                        httpRequest: httpCommunications[0].httpRequest,
                        httpRequestRejected: httpCommunications[0].httpRequestRejected,
                        httpResponse: httpCommunications[0].httpResponse,
                        httpResponseRejected: httpCommunications[0].httpResponseRejected,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});