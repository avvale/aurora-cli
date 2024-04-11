import { MessageCreateMessageController, MessageCreateMessageHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessageController', () =>
{
    let controller: MessageCreateMessageController;
    let handler: MessageCreateMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageCreateMessageController,
            ],
            providers: [
                {
                    provide : MessageCreateMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateMessageController>(MessageCreateMessageController);
        handler = module.get<MessageCreateMessageHandler>(MessageCreateMessageHandler);
    });

    describe('main', () =>
    {
        test('MessageCreateMessageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(
                await controller.main(
                    messageMockMessageData[0],
                ),
            )
                .toBe(messageMockMessageData[0]);
        });
    });
});
