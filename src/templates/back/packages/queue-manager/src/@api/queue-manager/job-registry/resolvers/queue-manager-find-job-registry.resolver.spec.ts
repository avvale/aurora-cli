/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryResolver } from './queue-manager-find-job-registry.resolver';
import { QueueManagerFindJobRegistryHandler } from '../handlers/queue-manager-find-job-registry.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main()).toBe(jobsRegistry[0]);
        });
    });
});