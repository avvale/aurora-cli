import {
    ToolsGetWebhookLogsQuery,
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
    ToolsWebhookLogMapper,
} from '@app/tools/webhook-log';
import { ToolsGetWebhookLogsQueryHandler } from '@app/tools/webhook-log/application/get/tools-get-webhook-logs.query-handler';
import { ToolsGetWebhookLogsService } from '@app/tools/webhook-log/application/get/tools-get-webhook-logs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetWebhookLogsQueryHandler', () => {
    let queryHandler: ToolsGetWebhookLogsQueryHandler;
    let service: ToolsGetWebhookLogsService;
    let repository: ToolsMockWebhookLogRepository;
    let mapper: ToolsWebhookLogMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsGetWebhookLogsQueryHandler,
                {
                    provide: ToolsIWebhookLogRepository,
                    useClass: ToolsMockWebhookLogRepository,
                },
                {
                    provide: ToolsGetWebhookLogsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsGetWebhookLogsQueryHandler>(
            ToolsGetWebhookLogsQueryHandler,
        );
        service = module.get<ToolsGetWebhookLogsService>(
            ToolsGetWebhookLogsService,
        );
        repository = <ToolsMockWebhookLogRepository>(
            module.get<ToolsIWebhookLogRepository>(ToolsIWebhookLogRepository)
        );
        mapper = new ToolsWebhookLogMapper();
    });

    describe('main', () => {
        test('ToolsGetWebhookLogsQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an webhookLogs founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new ToolsGetWebhookLogsQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
