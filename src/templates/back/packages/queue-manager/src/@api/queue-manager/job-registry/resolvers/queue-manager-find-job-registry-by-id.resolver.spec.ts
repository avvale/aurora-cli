/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryByIdResolver } from './queue-manager-find-job-registry-by-id.resolver';
import { QueueManagerFindJobRegistryByIdHandler } from '../handlers/queue-manager-find-job-registry-by-id.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerFindJobRegistryByIdResolver', () =>
{
    let resolver: QueueManagerFindJobRegistryByIdResolver;
    let handler: QueueManagerFindJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindJobRegistryByIdResolver,
                {
                    provide : QueueManagerFindJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerFindJobRegistryByIdResolver>(QueueManagerFindJobRegistryByIdResolver);
        handler = module.get<QueueManagerFindJobRegistryByIdHandler>(QueueManagerFindJobRegistryByIdHandler);
    });

    test('QueueManagerFindJobRegistryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(jobsRegistry[0].id)).toBe(jobsRegistry[0]);
        });
    });
});