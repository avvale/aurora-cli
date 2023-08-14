/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueueManagerUpdateJobRegistryByIdInput } from '@api/graphql';
import { QueueManagerUpsertJobRegistryHandler, QueueManagerUpsertJobRegistryResolver } from '@api/queue-manager/job-registry';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerUpsertJobRegistryResolver', () =>
{
    let resolver: QueueManagerUpsertJobRegistryResolver;
    let handler: QueueManagerUpsertJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerUpsertJobRegistryResolver,
                {
                    provide : QueueManagerUpsertJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerUpsertJobRegistryResolver>(QueueManagerUpsertJobRegistryResolver);
        handler = module.get<QueueManagerUpsertJobRegistryHandler>(QueueManagerUpsertJobRegistryHandler);
    });

    test('QueueManagerUpsertJobRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerUpsertJobRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(queueManagerMockJobRegistryData[0])));
            expect(await resolver.main(<QueueManagerUpdateJobRegistryByIdInput>queueManagerMockJobRegistryData[0])).toBe(queueManagerMockJobRegistryData[0]);
        });
    });
});
