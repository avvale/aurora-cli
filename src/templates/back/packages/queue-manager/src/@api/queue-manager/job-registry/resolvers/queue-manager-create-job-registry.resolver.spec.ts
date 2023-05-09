/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerCreateJobRegistryResolver } from './queue-manager-create-job-registry.resolver';
import { QueueManagerCreateJobRegistryHandler } from '../handlers/queue-manager-create-job-registry.handler';
import { QueueManagerCreateJobRegistryInput } from '@api/graphql';

// sources
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';

describe('QueueManagerCreateJobRegistryResolver', () =>
{
    let resolver: QueueManagerCreateJobRegistryResolver;
    let handler: QueueManagerCreateJobRegistryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerCreateJobRegistryResolver,
                {
                    provide : QueueManagerCreateJobRegistryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerCreateJobRegistryResolver>(QueueManagerCreateJobRegistryResolver);
        handler = module.get<QueueManagerCreateJobRegistryHandler>(QueueManagerCreateJobRegistryHandler);
    });

    test('QueueManagerCreateJobRegistryResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerCreateJobRegistryResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an jobRegistry created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobsRegistry[0])));
            expect(await resolver.main(<QueueManagerCreateJobRegistryInput>jobsRegistry[0])).toBe(jobsRegistry[0]);
        });
    });
});