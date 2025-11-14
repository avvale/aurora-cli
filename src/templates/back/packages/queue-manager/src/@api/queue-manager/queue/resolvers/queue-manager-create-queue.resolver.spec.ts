/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerCreateQueueInput } from '@api/graphql';
import {
    QueueManagerCreateQueueHandler,
    QueueManagerCreateQueueResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCreateQueueResolver', () => {
    let resolver: QueueManagerCreateQueueResolver;
    let handler: QueueManagerCreateQueueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerCreateQueueResolver,
                {
                    provide: QueueManagerCreateQueueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerCreateQueueResolver>(
            QueueManagerCreateQueueResolver,
        );
        handler = module.get<QueueManagerCreateQueueHandler>(
            QueueManagerCreateQueueHandler,
        );
    });

    test('QueueManagerCreateQueueResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerCreateQueueResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an queue created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <QueueManagerCreateQueueInput>queueManagerMockQueueData[0],
                ),
            ).toBe(queueManagerMockQueueData[0]);
        });
    });
});
