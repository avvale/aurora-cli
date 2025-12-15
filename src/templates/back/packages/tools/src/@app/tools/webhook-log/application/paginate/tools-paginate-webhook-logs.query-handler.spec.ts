import {
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
    ToolsPaginateWebhookLogsQuery,
} from '@app/tools/webhook-log';
import { ToolsPaginateWebhookLogsQueryHandler } from '@app/tools/webhook-log/application/paginate/tools-paginate-webhook-logs.query-handler';
import { ToolsPaginateWebhookLogsService } from '@app/tools/webhook-log/application/paginate/tools-paginate-webhook-logs.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhookLogsQueryHandler', () => {
    let queryHandler: ToolsPaginateWebhookLogsQueryHandler;
    let service: ToolsPaginateWebhookLogsService;
    let repository: ToolsMockWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsPaginateWebhookLogsQueryHandler,
                {
                    provide: ToolsIWebhookLogRepository,
                    useClass: ToolsMockWebhookLogRepository,
                },
                {
                    provide: ToolsPaginateWebhookLogsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsPaginateWebhookLogsQueryHandler>(
            ToolsPaginateWebhookLogsQueryHandler,
        );
        service = module.get<ToolsPaginateWebhookLogsService>(
            ToolsPaginateWebhookLogsService,
        );
        repository = <ToolsMockWebhookLogRepository>(
            module.get<ToolsIWebhookLogRepository>(ToolsIWebhookLogRepository)
        );
    });

    describe('main', () => {
        test('ToolsPaginateWebhookLogsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an webhookLogs paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new ToolsPaginateWebhookLogsQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});
