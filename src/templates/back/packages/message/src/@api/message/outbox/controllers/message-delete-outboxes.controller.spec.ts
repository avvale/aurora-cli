import { MessageDeleteOutboxesController, MessageDeleteOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxesController', () =>
{
    let controller: MessageDeleteOutboxesController;
    let handler: MessageDeleteOutboxesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageDeleteOutboxesController,
            ],
            providers: [
                {
                    provide : MessageDeleteOutboxesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageDeleteOutboxesController>(MessageDeleteOutboxesController);
        handler = module.get<MessageDeleteOutboxesHandler>(MessageDeleteOutboxesHandler);
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockOutboxData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData)));
            expect(await controller.main()).toBe(messageMockOutboxData);
        });
    });
});
