import { MessageFindOutboxController, MessageFindOutboxHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxController', () =>
{
    let controller: MessageFindOutboxController;
    let handler: MessageFindOutboxHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageFindOutboxController,
            ],
            providers: [
                {
                    provide : MessageFindOutboxHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageFindOutboxController>(MessageFindOutboxController);
        handler = module.get<MessageFindOutboxHandler>(MessageFindOutboxHandler);
    });

    describe('main', () =>
    {
        test('MessageFindOutboxController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a outbox', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(await controller.main()).toBe(messageMockOutboxData[0]);
        });
    });
});
