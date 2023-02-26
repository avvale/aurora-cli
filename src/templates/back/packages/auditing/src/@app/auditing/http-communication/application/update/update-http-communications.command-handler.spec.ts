import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { UpdateHttpCommunicationsCommandHandler } from './update-http-communications.command-handler';
import { UpdateHttpCommunicationsCommand } from './update-http-communications.command';
import { UpdateHttpCommunicationsService } from './update-http-communications.service';

describe('UpdateHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: UpdateHttpCommunicationsCommandHandler;
    let service: UpdateHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateHttpCommunicationsCommandHandler,
                {
                    provide : UpdateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateHttpCommunicationsCommandHandler>(UpdateHttpCommunicationsCommandHandler);
        service         = module.get<UpdateHttpCommunicationsService>(UpdateHttpCommunicationsService);
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
                new UpdateHttpCommunicationsCommand(
                    {
                        id: httpCommunications[0].id,
                        tags: httpCommunications[0].tags,
                        event: httpCommunications[0].event,
                        status: httpCommunications[0].status,
                        method: httpCommunications[0].method,
                        url: httpCommunications[0].url,
                        httpRequest: httpCommunications[0].httpRequest,
                        httpRequestRejected: httpCommunications[0].httpRequestRejected,
                        httpResponse: httpCommunications[0].httpResponse,
                        httpResponseRejected: httpCommunications[0].httpResponseRejected,
                        isReprocessing: httpCommunications[0].isReprocessing,
                        reprocessingHttpCommunicationId: httpCommunications[0].reprocessingHttpCommunicationId,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});