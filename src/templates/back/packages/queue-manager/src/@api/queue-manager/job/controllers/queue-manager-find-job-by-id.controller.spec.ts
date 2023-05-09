/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobByIdController } from './queue-manager-find-job-by-id.controller';
import { QueueManagerFindJobByIdHandler } from '../handlers/queue-manager-find-job-by-id.handler';

// sources
import { jobs } from '@app/queue-manager/job/infrastructure/mock/mock-job.data';

describe('QueueManagerFindJobByIdController', () =>
{
    let controller: QueueManagerFindJobByIdController;
    let handler: QueueManagerFindJobByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                QueueManagerFindJobByIdController,
            ],
            providers: [
                {
                    provide : QueueManagerFindJobByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<QueueManagerFindJobByIdController>(QueueManagerFindJobByIdController);
        handler = module.get<QueueManagerFindJobByIdHandler>(QueueManagerFindJobByIdHandler);
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an job by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(jobs[0])));
            expect(await controller.main(jobs[0].id)).toBe(jobs[0]);
        });
    });
});