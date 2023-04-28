/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { CreateHttpCommunicationsCommandHandler } from './create-http-communications.command-handler';
import { CreateHttpCommunicationsCommand } from './create-http-communications.command';
import { CreateHttpCommunicationsService } from './create-http-communications.service';

describe('CreateHttpCommunicationsCommandHandler', () =>
{
    let commandHandler: CreateHttpCommunicationsCommandHandler;
    let service: CreateHttpCommunicationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateHttpCommunicationsCommandHandler,
                {
                    provide : CreateHttpCommunicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CreateHttpCommunicationsCommandHandler>(CreateHttpCommunicationsCommandHandler);
        service = module.get<CreateHttpCommunicationsService>(CreateHttpCommunicationsService);
    });

    describe('main', () =>
    {
        test('CreateHttpCommunicationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return httpCommunications createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateHttpCommunicationsCommand(
                    httpCommunications,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});