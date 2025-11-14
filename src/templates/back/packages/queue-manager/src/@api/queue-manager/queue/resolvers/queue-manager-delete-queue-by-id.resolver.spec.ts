/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerDeleteQueueByIdHandler,
    QueueManagerDeleteQueueByIdResolver,
} from '@api/queue-manager/queue';
import { queueManagerMockQueueData } from '@app/queue-manager/queue';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteQueueByIdResolver', () => {
    let resolver: QueueManagerDeleteQueueByIdResolver;
    let handler: QueueManagerDeleteQueueByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerDeleteQueueByIdResolver,
                {
                    provide: QueueManagerDeleteQueueByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerDeleteQueueByIdResolver>(
            QueueManagerDeleteQueueByIdResolver,
        );
        handler = module.get<QueueManagerDeleteQueueByIdHandler>(
            QueueManagerDeleteQueueByIdHandler,
        );
    });

    test('QueueManagerDeleteQueueByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerDeleteQueueByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an queue deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockQueueData[0]),
                    ),
            );
            expect(await resolver.main(queueManagerMockQueueData[0].id)).toBe(
                queueManagerMockQueueData[0],
            );
        });
    });
});
