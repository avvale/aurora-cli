import { QueueManagerIJobRegistryRepository, QueueManagerMockJobRegistryRepository, QueueManagerSumJobRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerSumJobRegistryQueryHandler } from '@app/queue-manager/job-registry/application/sum/queue-manager-sum-job-registry.query-handler';
import { QueueManagerSumJobRegistryService } from '@app/queue-manager/job-registry/application/sum/queue-manager-sum-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerSumJobRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerSumJobRegistryQueryHandler;
    let service: QueueManagerSumJobRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerSumJobRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerSumJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerSumJobRegistryQueryHandler>(QueueManagerSumJobRegistryQueryHandler);
        service = module.get<QueueManagerSumJobRegistryService>(QueueManagerSumJobRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerSumJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new QueueManagerSumJobRegistryQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
