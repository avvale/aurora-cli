/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobByIdResolver } from './queue-manager-find-job-by-id.resolver';
import { QueueManagerFindJobByIdHandler } from '../handlers/queue-manager-find-job-by-id.handler';

// sources
import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerFindJobByIdResolver', () =>
{
    let resolver: QueueManagerFindJobByIdResolver;
    let handler: QueueManagerFindJobByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                QueueManagerFindJobByIdResolver,
                {
                    provide : QueueManagerFindJobByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<QueueManagerFindJobByIdResolver>(QueueManagerFindJobByIdResolver);
        handler = module.get<QueueManagerFindJobByIdHandler>(QueueManagerFindJobByIdHandler);
    });

    test('QueueManagerFindJobByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an job by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobs[0])));
            expect(await resolver.main(jobs[0].id)).toBe(jobs[0]);
        });
    });
});