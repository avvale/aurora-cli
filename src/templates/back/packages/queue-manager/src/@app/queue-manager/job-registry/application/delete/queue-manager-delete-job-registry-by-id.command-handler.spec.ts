import {
    QueueManagerDeleteJobRegistryByIdCommand,
    queueManagerMockJobRegistryData,
} from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobRegistryByIdCommandHandler } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-job-registry-by-id.command-handler';
import { QueueManagerDeleteJobRegistryByIdService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-job-registry-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobRegistryByIdCommandHandler', () => {
    let commandHandler: QueueManagerDeleteJobRegistryByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteJobRegistryByIdCommandHandler,
                {
                    provide: QueueManagerDeleteJobRegistryByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<QueueManagerDeleteJobRegistryByIdCommandHandler>(
                QueueManagerDeleteJobRegistryByIdCommandHandler,
            );
    });

    describe('main', () => {
        test('QueueManagerDeleteJobRegistryByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the QueueManagerDeleteJobRegistryByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new QueueManagerDeleteJobRegistryByIdCommand(
                        queueManagerMockJobRegistryData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
