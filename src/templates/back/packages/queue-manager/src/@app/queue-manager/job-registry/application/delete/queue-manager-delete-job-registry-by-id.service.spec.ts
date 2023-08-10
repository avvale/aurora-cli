/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerDeleteJobRegistryByIdService } from './queue-manager-delete-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '../../domain/value-objects';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerDeleteJobRegistryByIdService', () =>
{
    let service: QueueManagerDeleteJobRegistryByIdService;
    let repository: QueueManagerIJobRegistryRepository;
    let mockRepository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerDeleteJobRegistryByIdService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerDeleteJobRegistryByIdService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerDeleteJobRegistryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete jobRegistry and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new QueueManagerJobRegistryId(queueManagerMockJobRegistryData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
