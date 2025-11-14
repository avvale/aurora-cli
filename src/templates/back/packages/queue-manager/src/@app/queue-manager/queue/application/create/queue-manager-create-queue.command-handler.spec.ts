import {
    QueueManagerCreateQueueCommand,
    queueManagerMockQueueData,
} from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';
import { QueueManagerCreateQueueCommandHandler } from './queue-manager-create-queue.command-handler';
import { QueueManagerCreateQueueService } from './queue-manager-create-queue.service';

describe('QueueManagerCreateQueueCommandHandler', () => {
    let commandHandler: QueueManagerCreateQueueCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateQueueCommandHandler,
                {
                    provide: QueueManagerCreateQueueService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<QueueManagerCreateQueueCommandHandler>(
            QueueManagerCreateQueueCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateQueueCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the QueueManagerCreateQueueService', async () => {
            expect(
                await commandHandler.execute(
                    new QueueManagerCreateQueueCommand(
                        {
                            id: queueManagerMockQueueData[0].id,
                            rowId: queueManagerMockQueueData[0].rowId,
                            prefix: queueManagerMockQueueData[0].prefix,
                            name: queueManagerMockQueueData[0].name,
                        },
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
