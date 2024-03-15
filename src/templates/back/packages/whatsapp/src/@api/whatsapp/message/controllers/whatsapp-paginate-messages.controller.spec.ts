import { WhatsappPaginateMessagesController, WhatsappPaginateMessagesHandler } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateMessagesController', () =>
{
    let controller: WhatsappPaginateMessagesController;
    let handler: WhatsappPaginateMessagesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappPaginateMessagesController,
            ],
            providers: [
                {
                    provide : WhatsappPaginateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappPaginateMessagesController>(WhatsappPaginateMessagesController);
        handler = module.get<WhatsappPaginateMessagesHandler>(WhatsappPaginateMessagesHandler);
    });

    describe('main', () =>
    {
        test('WhatsappPaginateMessagesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a whatsappMockMessageData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockMessageData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockMessageData,
            });
        });
    });
});
