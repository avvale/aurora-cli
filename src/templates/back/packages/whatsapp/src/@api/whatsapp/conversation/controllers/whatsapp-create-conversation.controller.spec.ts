import { WhatsappCreateConversationController, WhatsappCreateConversationHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationController', () =>
{
    let controller: WhatsappCreateConversationController;
    let handler: WhatsappCreateConversationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappCreateConversationController,
            ],
            providers: [
                {
                    provide : WhatsappCreateConversationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappCreateConversationController>(WhatsappCreateConversationController);
        handler = module.get<WhatsappCreateConversationHandler>(WhatsappCreateConversationHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an conversation created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(
                await controller.main(
                    whatsappMockConversationData[0],
                ),
            )
                .toBe(whatsappMockConversationData[0]);
        });
    });
});
