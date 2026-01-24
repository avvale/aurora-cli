/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateJobsHandler } from '../handlers/queue-manager-paginate-jobs.handler';
import { QueueManagerPaginateJobsResolver } from './queue-manager-paginate-jobs.resolver';

// sources
// import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerPaginateJobsResolver', () => {
  let resolver: QueueManagerPaginateJobsResolver;
  let handler: QueueManagerPaginateJobsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        QueueManagerPaginateJobsResolver,
        {
          provide: QueueManagerPaginateJobsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<QueueManagerPaginateJobsResolver>(
      QueueManagerPaginateJobsResolver,
    );
    handler = module.get<QueueManagerPaginateJobsHandler>(
      QueueManagerPaginateJobsHandler,
    );
  });

  test('QueueManagerPaginateJobsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('QueueManagerPaginateJobsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a jobs', async () => {
      /* jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : jobs,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : jobs,
            }); */
    });
  });
});
