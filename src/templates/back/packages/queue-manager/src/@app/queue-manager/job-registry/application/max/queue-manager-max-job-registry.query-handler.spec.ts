import { QueueManagerIJobRegistryRepository, QueueManagerMaxJobRegistryQuery, QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry';
import { QueueManagerMaxJobRegistryQueryHandler } from '@app/queue-manager/job-registry/application/max/queue-manager-max-job-registry.query-handler';
import { QueueManagerMaxJobRegistryService } from '@app/queue-manager/job-registry/application/max/queue-manager-max-job-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMaxJobRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerMaxJobRegistryQueryHandler;
    let service: QueueManagerMaxJobRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerMaxJobRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerMaxJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerMaxJobRegistryQueryHandler>(QueueManagerMaxJobRegistryQueryHandler);
        service = module.get<QueueManagerMaxJobRegistryService>(QueueManagerMaxJobRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMaxJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new QueueManagerMaxJobRegistryQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
