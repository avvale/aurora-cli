import {
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsPaginateWebhookLogsService } from '@app/tools/webhook-log/application/paginate/tools-paginate-webhook-logs.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhookLogsService', () => {
    let service: ToolsPaginateWebhookLogsService;
    let repository: ToolsIWebhookLogRepository;
    let mockRepository: ToolsMockWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsPaginateWebhookLogsService,
                ToolsMockWebhookLogRepository,
                {
                    provide: ToolsIWebhookLogRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsPaginateWebhookLogsService);
        repository = module.get(ToolsIWebhookLogRepository);
        mockRepository = module.get(ToolsMockWebhookLogRepository);
    });

    describe('main', () => {
        test('ToolsPaginateWebhookLogsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate webhookLogs', async () => {
            jest.spyOn(repository, 'paginate').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            count: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            rows: mockRepository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await service.main({
                    offset: 0,
                    limit: 10,
                }),
            ).toStrictEqual({
                total: mockRepository.collectionSource.slice(0, 10).length,
                count: mockRepository.collectionSource.slice(0, 10).length,
                rows: mockRepository.collectionSource.slice(0, 10),
            });
        });
    });
});
