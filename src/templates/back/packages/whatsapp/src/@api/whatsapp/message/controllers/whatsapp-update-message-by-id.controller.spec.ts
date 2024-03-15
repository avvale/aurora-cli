import { WhatsappUpdateMessageByIdController, WhatsappUpdateMessageByIdHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessageByIdController', () =>
{
    let controller: WhatsappUpdateMessageByIdController;
    let handler: WhatsappUpdateMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappUpdateMessageByIdController,
            ],
            providers: [
                {
                    provide : WhatsappUpdateMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappUpdateMessageByIdController>(WhatsappUpdateMessageByIdController);
        handler = module.get<WhatsappUpdateMessageByIdHandler>(WhatsappUpdateMessageByIdHandler);
    });

    describe('main', () =>
    {
        test('WhatsappUpdateMessageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a message updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await controller.main(whatsappMockMessageData[0])).toBe(whatsappMockMessageData[0]);
        });
    });
});
