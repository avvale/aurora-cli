import { WhatsappPaginateTimelinesController, WhatsappPaginateTimelinesHandler } from '@api/whatsapp/timeline';
import { whatsappMockTimelineData } from '@app/whatsapp/timeline';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateTimelinesController', () =>
{
    let controller: WhatsappPaginateTimelinesController;
    let handler: WhatsappPaginateTimelinesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                WhatsappPaginateTimelinesController,
            ],
            providers: [
                {
                    provide : WhatsappPaginateTimelinesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<WhatsappPaginateTimelinesController>(WhatsappPaginateTimelinesController);
        handler = module.get<WhatsappPaginateTimelinesHandler>(WhatsappPaginateTimelinesHandler);
    });

    describe('main', () =>
    {
        test('WhatsappPaginateTimelinesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a whatsappMockTimelineData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : whatsappMockTimelineData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : whatsappMockTimelineData,
            });
        });
    });
});
