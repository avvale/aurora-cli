import {
    QueueManagerGetJobsRegistryQuery,
    QueueManagerIJobRegistryRepository,
    QueueManagerJobRegistryMapper,
    QueueManagerMockJobRegistryRepository,
} from '@app/queue-manager/job-registry';
import { QueueManagerGetJobsRegistryQueryHandler } from '@app/queue-manager/job-registry/application/get/queue-manager-get-jobs-registry.query-handler';
import { QueueManagerGetJobsRegistryService } from '@app/queue-manager/job-registry/application/get/queue-manager-get-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetJobsRegistryQueryHandler', () => {
    let queryHandler: QueueManagerGetJobsRegistryQueryHandler;
    let service: QueueManagerGetJobsRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerGetJobsRegistryQueryHandler,
                {
                    provide: QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide: QueueManagerGetJobsRegistryService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<QueueManagerGetJobsRegistryQueryHandler>(
            QueueManagerGetJobsRegistryQueryHandler,
        );
        service = module.get<QueueManagerGetJobsRegistryService>(
            QueueManagerGetJobsRegistryService,
        );
        repository = <QueueManagerMockJobRegistryRepository>(
            module.get<QueueManagerIJobRegistryRepository>(
                QueueManagerIJobRegistryRepository,
            )
        );
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () => {
        test('QueueManagerGetJobsRegistryQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsRegistry founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new QueueManagerGetJobsRegistryQuery(),
                ),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
