import { QueueManagerUpsertQueueController, QueueManagerUpsertQueueHandler } from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertQueueController', () =>
{
    let controller: QueueManagerUpsertQueueController;
    let handler: QueueManagerUpsertQueueHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerUpsertQueueController,
            ],
            providers: [
                {
                    provide : QueueManagerUpsertQueueHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerUpsertQueueController>(QueueManagerUpsertQueueController);
        handler = module.get<QueueManagerUpsertQueueHandler>(QueueManagerUpsertQueueHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertQueueController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queue upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockQueueData[0])));
            expect(await controller.main(queueManagerMockQueueData[0])).toBe(queueManagerMockQueueData[0]);
        });
    });
});
