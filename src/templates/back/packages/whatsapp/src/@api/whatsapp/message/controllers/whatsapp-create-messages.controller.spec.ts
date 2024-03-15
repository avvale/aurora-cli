import { WhatsappCreateMessagesController, WhatsappCreateMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessagesController', () =>
{
    let controller: WhatsappCreateMessagesController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                WhatsappCreateMessagesController,
            ],
            providers: [
                {
                    provide : WhatsappCreateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappCreateMessagesController>(WhatsappCreateMessagesController);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an whatsappMockMessageData created', async () =>
        {
            expect(
                await controller.main(
                    whatsappMockMessageData,
                ),
            )
                .toBe(undefined);
        });
    });
});
