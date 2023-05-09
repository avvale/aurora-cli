import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateQueuesController } from './queue-manager-create-queues.controller';
import { QueueManagerCreateQueuesHandler } from '../handlers/queue-manager-create-queues.handler';

// sources
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';

describe('QueueManagerCreateQueuesController', () =>
{
    let controller: QueueManagerCreateQueuesController;
    let handler: QueueManagerCreateQueuesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                QueueManagerCreateQueuesController,
            ],
            providers: [
                {
                    provide : QueueManagerCreateQueuesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerCreateQueuesController>(QueueManagerCreateQueuesController);
        handler = module.get<QueueManagerCreateQueuesHandler>(QueueManagerCreateQueuesHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerCreateQueuesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an queues created', async () =>
        {
            expect(await controller.main(queues)).toBe(undefined);
        });
    });
});