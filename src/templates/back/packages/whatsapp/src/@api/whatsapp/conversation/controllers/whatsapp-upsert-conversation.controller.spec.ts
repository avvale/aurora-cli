import { WhatsappUpsertConversationController, WhatsappUpsertConversationHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertConversationController', () =>
{
    let controller: WhatsappUpsertConversationController;
    let handler: WhatsappUpsertConversationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappUpsertConversationController,
            ],
            providers: [
                {
                    provide : WhatsappUpsertConversationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappUpsertConversationController>(WhatsappUpsertConversationController);
        handler = module.get<WhatsappUpsertConversationHandler>(WhatsappUpsertConversationHandler);
    });

    describe('main', () =>
    {
        test('WhatsappUpsertConversationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an conversation upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await controller.main(whatsappMockConversationData[0])).toBe(whatsappMockConversationData[0]);
        });
    });
});
