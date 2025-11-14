import {
    QueueManagerDeleteQueueByIdCommand,
    queueManagerMockQueueData,
} from '@app/queue-manager/queue';
import { QueueManagerDeleteQueueByIdCommandHandler } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queue-by-id.command-handler';
import { QueueManagerDeleteQueueByIdService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueueByIdCommandHandler', () => {
    let commandHandler: QueueManagerDeleteQueueByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteQueueByIdCommandHandler,
                {
                    provide: QueueManagerDeleteQueueByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<QueueManagerDeleteQueueByIdCommandHandler>(
            QueueManagerDeleteQueueByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerDeleteQueueByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the QueueManagerDeleteQueueByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new QueueManagerDeleteQueueByIdCommand(
                        queueManagerMockQueueData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
