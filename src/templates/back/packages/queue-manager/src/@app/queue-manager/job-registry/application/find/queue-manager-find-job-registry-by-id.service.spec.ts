import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerFindJobRegistryByIdService } from './queue-manager-find-job-registry-by-id.service';
import { QueueManagerJobRegistryId } from '../../domain/value-objects';
import { QueueManagerIJobRegistryRepository } from '../../domain/queue-manager-job-registry.repository';
import { QueueManagerMockJobRegistryRepository } from '../../infrastructure/mock/queue-manager-mock-job-registry.repository';

describe('QueueManagerFindJobRegistryByIdService', () =>
{
    let service: QueueManagerFindJobRegistryByIdService;
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
                QueueManagerFindJobRegistryByIdService,
                QueueManagerMockJobRegistryRepository,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(QueueManagerFindJobRegistryByIdService);
        repository = module.get(QueueManagerIJobRegistryRepository);
        mockRepository = module.get(QueueManagerMockJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('FindJobRegistryByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find jobRegistry by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new QueueManagerJobRegistryId(queueManagerMockJobRegistryData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
