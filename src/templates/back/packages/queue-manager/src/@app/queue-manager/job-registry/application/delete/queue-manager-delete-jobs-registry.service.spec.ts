/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerIJobRegistryRepository,
    QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobsRegistryService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-jobs-registry.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobsRegistryService', () => {
    let service: QueueManagerDeleteJobsRegistryService;
    let repository: QueueManagerIJobRegistryRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerDeleteJobsRegistryService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide: QueueManagerIJobRegistryRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerDeleteJobsRegistryService);
        repository = module.get(QueueManagerIJobRegistryRepository);
    });

    describe('main', () => {
        test('QueueManagerDeleteJobsRegistryService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete jobRegistry and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
