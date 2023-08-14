/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerPaginateJobsController } from './queue-manager-paginate-jobs.controller';
import { QueueManagerPaginateJobsHandler } from '../handlers/queue-manager-paginate-jobs.handler';

// sources
// import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerPaginateJobsController', () =>
{
    let controller: QueueManagerPaginateJobsController;
    let handler: QueueManagerPaginateJobsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerPaginateJobsController,
            ],
            providers: [
                {
                    provide : QueueManagerPaginateJobsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerPaginateJobsController>(QueueManagerPaginateJobsController);
        handler = module.get<QueueManagerPaginateJobsHandler>(QueueManagerPaginateJobsHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a jobs', async () =>
        {
            /* jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : jobs,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : jobs,
            }); */
        });
    });
});