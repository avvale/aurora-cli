import { MessageCreateMessagesController, MessageCreateMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessagesController', () =>
{
    let controller: MessageCreateMessagesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                MessageCreateMessagesController,
            ],
            providers: [
                {
                    provide : MessageCreateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<MessageCreateMessagesController>(MessageCreateMessagesController);
    });

    describe('main', () =>
    {
        test('MessageCreateMessagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an messageMockMessageData created', async () =>
        {
            expect(
                await controller.main(
                    messageMockMessageData,
                ),
            )
                .toBe(undefined);
        });
    });
});
