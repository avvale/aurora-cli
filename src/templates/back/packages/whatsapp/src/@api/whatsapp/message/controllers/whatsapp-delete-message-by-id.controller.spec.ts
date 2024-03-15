/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteMessageByIdController, WhatsappDeleteMessageByIdHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessageByIdController', () =>
{
    let controller: WhatsappDeleteMessageByIdController;
    let handler: WhatsappDeleteMessageByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappDeleteMessageByIdController,
            ],
            providers: [
                {
                    provide : WhatsappDeleteMessageByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappDeleteMessageByIdController>(WhatsappDeleteMessageByIdController);
        handler = module.get<WhatsappDeleteMessageByIdHandler>(WhatsappDeleteMessageByIdHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteMessageByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an message deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockMessageData[0])));
            expect(await controller.main(whatsappMockMessageData[0].id)).toBe(whatsappMockMessageData[0]);
        });
    });
});
