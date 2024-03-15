import { WhatsappPaginateConversationsController, WhatsappPaginateConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateConversationsController', () =>
{
    let controller: WhatsappPaginateConversationsController;
    let handler: WhatsappPaginateConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappPaginateConversationsController,
            ],
            providers: [
                {
                    provide : WhatsappPaginateConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappPaginateConversationsController>(WhatsappPaginateConversationsController);
        handler = module.get<WhatsappPaginateConversationsHandler>(WhatsappPaginateConversationsHandler);
    });

    describe('main', () =>
    {
        test('WhatsappPaginateConversationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a whatsappMockConversationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockConversationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockConversationData,
            });
        });
    });
});
