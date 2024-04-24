import { QueueManagerCountJobRegistryQuery, QueueManagerIJobRegistryRepository, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerCountJobRegistryQueryHandler } from '@app/queue-manager/job-registry/application/count/queue-manager-count-job-registry.query-handler';
import { QueueManagerCountJobRegistryService } from '@app/queue-manager/job-registry/application/count/queue-manager-count-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCountJobRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerCountJobRegistryQueryHandler;
    let service: QueueManagerCountJobRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCountJobRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerCountJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerCountJobRegistryQueryHandler>(QueueManagerCountJobRegistryQueryHandler);
        service = module.get<QueueManagerCountJobRegistryService>(QueueManagerCountJobRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerCountJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new QueueManagerCountJobRegistryQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
