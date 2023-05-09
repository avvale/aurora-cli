/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerDeleteJobRegistryByIdResolver } from './queue-manager-delete-job-registry-by-id.resolver';
import { QueueManagerDeleteJobRegistryByIdHandler } from '../handlers/queue-manager-delete-job-registry-by-id.handler';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerDeleteJobRegistryByIdResolver', () =>
{
    let resolver: QueueManagerDeleteJobRegistryByIdResolver;
    let handler: QueueManagerDeleteJobRegistryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerDeleteJobRegistryByIdResolver,
                {
                    provide : QueueManagerDeleteJobRegistryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerDeleteJobRegistryByIdResolver>(QueueManagerDeleteJobRegistryByIdResolver);
        handler = module.get<QueueManagerDeleteJobRegistryByIdHandler>(QueueManagerDeleteJobRegistryByIdHandler);
    });

    test('QueueManagerDeleteJobRegistryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobRegistryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(jobsRegistry[0].id)).toBe(jobsRegistry[0]);
        });
    });
});