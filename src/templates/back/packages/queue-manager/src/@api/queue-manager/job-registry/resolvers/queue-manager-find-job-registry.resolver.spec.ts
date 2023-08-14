/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerFindJobRegistryHandler, QueueManagerFindJobRegistryResolver } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindJobRegistryResolver', () =>
{
    let resolver: QueueManagerFindJobRegistryResolver;
    let handler: QueueManagerFindJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindJobRegistryResolver,
                {
                    provide : QueueManagerFindJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerFindJobRegistryResolver>(QueueManagerFindJobRegistryResolver);
        handler = module.get<QueueManagerFindJobRegistryHandler>(QueueManagerFindJobRegistryHandler);
    });

    test('QueueManagerFindJobRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a jobRegistry', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await resolver.main()).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
