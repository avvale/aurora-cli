/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerUpsertQueueController } from './queue-manager-upsert-queue.controller';
import { QueueManagerUpsertQueueHandler } from '../handlers/queue-manager-upsert-queue.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queues[0])));
            expect(await controller.main(queues[0])).toBe(queues[0]);
        });
    });
});