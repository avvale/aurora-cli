import { MessageGetOutboxesController, MessageGetOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetOutboxesController', () =>
{
    let controller: MessageGetOutboxesController;
    let handler: MessageGetOutboxesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageGetOutboxesController,
            ],
            providers: [
                {
                    provide : MessageGetOutboxesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageGetOutboxesController>(MessageGetOutboxesController);
        handler = module.get<MessageGetOutboxesHandler>(MessageGetOutboxesHandler);
    });

    describe('main', () =>
    {
        test('MessageGetOutboxesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a messageMockOutboxData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData)));
            expect(await controller.main()).toBe(messageMockOutboxData);
        });
    });
});
