import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';
import { UpdateHttpCommunicationByIdCommandHandler } from './update-http-communication-by-id.command-handler';
import { UpdateHttpCommunicationByIdCommand } from './update-http-communication-by-id.command';
import { UpdateHttpCommunicationByIdService } from './update-http-communication-by-id.service';

describe('UpdateHttpCommunicationByIdCommandHandler', () =>
{
    let commandHandler: UpdateHttpCommunicationByIdCommandHandler;
    let service: UpdateHttpCommunicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateHttpCommunicationByIdCommandHandler,
                {
                    provide : UpdateHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateHttpCommunicationByIdCommandHandler>(UpdateHttpCommunicationByIdCommandHandler);
        service         = module.get<UpdateHttpCommunicationByIdService>(UpdateHttpCommunicationByIdService);
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
                new UpdateHttpCommunicationByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});