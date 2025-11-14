import { QueueManagerDeleteJobsRegistryCommand } from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobsRegistryCommandHandler } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-jobs-registry.command-handler';
import { QueueManagerDeleteJobsRegistryService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobsRegistryCommandHandler', () => {
    let commandHandler: QueueManagerDeleteJobsRegistryCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerDeleteJobsRegistryCommandHandler,
                {
                    provide: QueueManagerDeleteJobsRegistryService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler =
            module.get<QueueManagerDeleteJobsRegistryCommandHandler>(
                QueueManagerDeleteJobsRegistryCommandHandler,
            );
    });

    describe('main', () => {
        test('QueueManagerDeleteJobsRegistryCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new QueueManagerDeleteJobsRegistryCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
