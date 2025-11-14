import { QueueManagerDeleteQueuesCommand } from '@app/queue-manager/queue';
import { QueueManagerDeleteQueuesCommandHandler } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queues.command-handler';
import { QueueManagerDeleteQueuesService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queues.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueuesCommandHandler', () => {
    let commandHandler: QueueManagerDeleteQueuesCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteQueuesCommandHandler,
                {
                    provide: QueueManagerDeleteQueuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<QueueManagerDeleteQueuesCommandHandler>(
            QueueManagerDeleteQueuesCommandHandler,
        );
    });

    describe('main', () => {
        test('QueueManagerDeleteQueuesCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new QueueManagerDeleteQueuesCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
