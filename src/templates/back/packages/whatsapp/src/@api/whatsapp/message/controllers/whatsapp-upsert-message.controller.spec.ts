import { WhatsappUpsertMessageController, WhatsappUpsertMessageHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertMessageController', () =>
{
    let controller: WhatsappUpsertMessageController;
    let handler: WhatsappUpsertMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappUpsertMessageController,
            ],
            providers: [
                {
                    provide : WhatsappUpsertMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappUpsertMessageController>(WhatsappUpsertMessageController);
        handler = module.get<WhatsappUpsertMessageHandler>(WhatsappUpsertMessageHandler);
    });

    describe('main', () =>
    {
        test('WhatsappUpsertMessageController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await controller.main(whatsappMockMessageData[0])).toBe(whatsappMockMessageData[0]);
        });
    });
});
