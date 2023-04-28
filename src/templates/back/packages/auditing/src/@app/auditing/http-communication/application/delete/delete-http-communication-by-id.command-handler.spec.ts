import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteHttpCommunicationByIdCommandHandler } from './delete-http-communication-by-id.command-handler';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { DeleteHttpCommunicationByIdCommand } from './delete-http-communication-by-id.command';
import { DeleteHttpCommunicationByIdService } from './delete-http-communication-by-id.service';

describe('DeleteHttpCommunicationByIdCommandHandler', () =>
{
    let commandHandler: DeleteHttpCommunicationByIdCommandHandler;
    let service: DeleteHttpCommunicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteHttpCommunicationByIdCommandHandler,
                {
                    provide : DeleteHttpCommunicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteHttpCommunicationByIdCommandHandler>(DeleteHttpCommunicationByIdCommandHandler);
        service = module.get<DeleteHttpCommunicationByIdService>(DeleteHttpCommunicationByIdService);
    });

    describe('main', () =>
    {
        test('DeleteHttpCommunicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteHttpCommunicationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteHttpCommunicationByIdCommand(
                    httpCommunications[0].id,
                ),
            )).toBe(undefined);
        });
    });
});