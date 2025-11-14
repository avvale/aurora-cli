/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerIQueueRepository,
    QueueManagerMockQueueRepository,
} from '@app/queue-manager/queue';
import { QueueManagerDeleteQueuesService } from '@app/queue-manager/queue/application/delete/queue-manager-delete-queues.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueuesService', () => {
    let service: QueueManagerDeleteQueuesService;
    let repository: QueueManagerIQueueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerDeleteQueuesService,
                QueueManagerMockQueueRepository,
                {
                    provide: QueueManagerIQueueRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerDeleteQueuesService);
        repository = module.get(QueueManagerIQueueRepository);
    });

    describe('main', () => {
        test('QueueManagerDeleteQueuesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete queue and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
