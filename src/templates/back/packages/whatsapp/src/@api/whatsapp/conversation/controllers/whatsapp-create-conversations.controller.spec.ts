import { WhatsappCreateConversationsController, WhatsappCreateConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationsController', () =>
{
    let controller: WhatsappCreateConversationsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                WhatsappCreateConversationsController,
            ],
            providers: [
                {
                    provide : WhatsappCreateConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappCreateConversationsController>(WhatsappCreateConversationsController);
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an whatsappMockConversationData created', async () =>
        {
            expect(
                await controller.main(
                    whatsappMockConversationData,
                ),
            )
                .toBe(undefined);
        });
    });
});
