import { QueueManagerCreateQueueInput } from '@api/graphql';
import {
    QueueManagerCreateQueuesHandler,
    QueueManagerCreateQueuesResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueuesResolver', () => {
    let resolver: QueueManagerCreateQueuesResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCreateQueuesResolver,
                {
                    provide: QueueManagerCreateQueuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerCreateQueuesResolver>(
            QueueManagerCreateQueuesResolver,
        );
    });

    test('QueueManagerCreateQueuesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerCreateQueuesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an queues created', async () => {
            expect(
                await resolver.main(
                    <QueueManagerCreateQueueInput[]>queueManagerMockQueueData,
                ),
            ).toBe(undefined);
        });
    });
});
