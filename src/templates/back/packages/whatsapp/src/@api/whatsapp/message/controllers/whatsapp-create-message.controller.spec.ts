import { WhatsappCreateMessageController, WhatsappCreateMessageHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessageController', () =>
{
    let controller: WhatsappCreateMessageController;
    let handler: WhatsappCreateMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappCreateMessageController,
            ],
            providers: [
                {
                    provide : WhatsappCreateMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappCreateMessageController>(WhatsappCreateMessageController);
        handler = module.get<WhatsappCreateMessageHandler>(WhatsappCreateMessageHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(
                await controller.main(
                    whatsappMockMessageData[0],
                ),
            )
                .toBe(whatsappMockMessageData[0]);
        });
    });
});
