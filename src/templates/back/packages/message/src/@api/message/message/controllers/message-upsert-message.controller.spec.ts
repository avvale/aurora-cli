import { MessageUpsertMessageController, MessageUpsertMessageHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertMessageController', () =>
{
    let controller: MessageUpsertMessageController;
    let handler: MessageUpsertMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                MessageUpsertMessageController,
            ],
            providers: [
                {
                    provide : MessageUpsertMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageUpsertMessageController>(MessageUpsertMessageController);
        handler = module.get<MessageUpsertMessageHandler>(MessageUpsertMessageHandler);
    });

    describe('main', () =>
    {
        test('MessageUpsertMessageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(await controller.main(messageMockMessageData[0])).toBe(messageMockMessageData[0]);
        });
    });
});
