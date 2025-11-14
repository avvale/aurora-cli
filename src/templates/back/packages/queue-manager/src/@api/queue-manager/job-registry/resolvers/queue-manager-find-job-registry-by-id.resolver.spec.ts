/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerFindJobRegistryByIdHandler,
    QueueManagerFindJobRegistryByIdResolver,
} from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryByIdResolver', () => {
    let resolver: QueueManagerFindJobRegistryByIdResolver;
    let handler: QueueManagerFindJobRegistryByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                QueueManagerFindJobRegistryByIdResolver,
                {
                    provide: QueueManagerFindJobRegistryByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<QueueManagerFindJobRegistryByIdResolver>(
            QueueManagerFindJobRegistryByIdResolver,
        );
        handler = module.get<QueueManagerFindJobRegistryByIdHandler>(
            QueueManagerFindJobRegistryByIdHandler,
        );
    });

    test('QueueManagerFindJobRegistryByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('QueueManagerFindJobRegistryByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(queueManagerMockJobRegistryData[0]),
                    ),
            );
            expect(
                await resolver.main(queueManagerMockJobRegistryData[0].id),
            ).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
