import { WhatsappDeleteConversationsController, WhatsappDeleteConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationsController', () =>
{
    let controller: WhatsappDeleteConversationsController;
    let handler: WhatsappDeleteConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappDeleteConversationsController,
            ],
            providers: [
                {
                    provide : WhatsappDeleteConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappDeleteConversationsController>(WhatsappDeleteConversationsController);
        handler = module.get<WhatsappDeleteConversationsHandler>(WhatsappDeleteConversationsHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteConversationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an whatsappMockConversationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData)));
            expect(await controller.main()).toBe(whatsappMockConversationData);
        });
    });
});
