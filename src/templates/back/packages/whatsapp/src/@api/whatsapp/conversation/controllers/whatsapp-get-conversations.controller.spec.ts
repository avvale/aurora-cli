import { WhatsappGetConversationsController, WhatsappGetConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetConversationsController', () =>
{
    let controller: WhatsappGetConversationsController;
    let handler: WhatsappGetConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappGetConversationsController,
            ],
            providers: [
                {
                    provide : WhatsappGetConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappGetConversationsController>(WhatsappGetConversationsController);
        handler = module.get<WhatsappGetConversationsHandler>(WhatsappGetConversationsHandler);
    });

    describe('main', () =>
    {
        test('WhatsappGetConversationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a whatsappMockConversationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData)));
            expect(await controller.main()).toBe(whatsappMockConversationData);
        });
    });
});
