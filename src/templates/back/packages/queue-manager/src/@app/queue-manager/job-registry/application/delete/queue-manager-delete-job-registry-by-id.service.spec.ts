/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    QueueManagerIJobRegistryRepository,
    queueManagerMockJobRegistryData,
    QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerDeleteJobRegistryByIdService } from '@app/queue-manager/job-registry/application/delete/queue-manager-delete-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '@app/queue-manager/job-registry/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerDeleteJobRegistryByIdService', () => {
    let service: QueueManagerDeleteJobRegistryByIdService;
    let repository: QueueManagerIJobRegistryRepository;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerDeleteJobRegistryByIdService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide: QueueManagerIJobRegistryRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(QueueManagerDeleteJobRegistryByIdService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () => {
        test('QueueManagerDeleteJobRegistryByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete jobRegistry and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new QueueManagerJobRegistryId(
                        queueManagerMockJobRegistryData[0].id,
                    ),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
