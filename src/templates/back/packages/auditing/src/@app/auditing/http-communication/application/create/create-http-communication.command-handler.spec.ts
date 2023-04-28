import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { CreateHttpCommunicationCommandHandler } from './create-http-communication.command-handler';
import { CreateHttpCommunicationCommand } from './create-http-communication.command';
import { CreateHttpCommunicationService } from './create-http-communication.service';

describe('CreateHttpCommunicationCommandHandler', () =>
{
    let commandHandler: CreateHttpCommunicationCommandHandler;
    let service: CreateHttpCommunicationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateHttpCommunicationCommandHandler,
                {
                    provide : CreateHttpCommunicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateHttpCommunicationCommandHandler>(CreateHttpCommunicationCommandHandler);
        service = module.get<CreateHttpCommunicationService>(CreateHttpCommunicationService);
    });

    describe('main', () =>
    {
        test('CreateHttpCommunicationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateHttpCommunicationService', async () =>
        {
            expect(await commandHandler.execute(
                new CreateHttpCommunicationCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});