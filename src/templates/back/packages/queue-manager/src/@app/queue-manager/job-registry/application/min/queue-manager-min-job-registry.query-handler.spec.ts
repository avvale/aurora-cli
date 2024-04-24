import { QueueManagerIJobRegistryRepository, QueueManagerMinJobRegistryQuery, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerMinJobRegistryQueryHandler } from '@app/queue-manager/job-registry/application/min/queue-manager-min-job-registry.query-handler';
import { QueueManagerMinJobRegistryService } from '@app/queue-manager/job-registry/application/min/queue-manager-min-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMinJobRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerMinJobRegistryQueryHandler;
    let service: QueueManagerMinJobRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerMinJobRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerMinJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerMinJobRegistryQueryHandler>(QueueManagerMinJobRegistryQueryHandler);
        service = module.get<QueueManagerMinJobRegistryService>(QueueManagerMinJobRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMinJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new QueueManagerMinJobRegistryQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
