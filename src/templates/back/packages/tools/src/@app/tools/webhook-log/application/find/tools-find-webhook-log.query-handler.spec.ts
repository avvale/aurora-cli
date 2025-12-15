import {
    ToolsFindWebhookLogQuery,
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
    ToolsWebhookLogMapper,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogQueryHandler } from '@app/tools/webhook-log/application/find/tools-find-webhook-log.query-handler';
import { ToolsFindWebhookLogService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogQueryHandler', () => {
    let queryHandler: ToolsFindWebhookLogQueryHandler;
    let service: ToolsFindWebhookLogService;
    let repository: ToolsMockWebhookLogRepository;
    let mapper: ToolsWebhookLogMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsFindWebhookLogQueryHandler,
                {
                    provide: ToolsIWebhookLogRepository,
                    useClass: ToolsMockWebhookLogRepository,
                },
                {
                    provide: ToolsFindWebhookLogService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsFindWebhookLogQueryHandler>(
            ToolsFindWebhookLogQueryHandler,
        );
        service = module.get<ToolsFindWebhookLogService>(
            ToolsFindWebhookLogService,
        );
        repository = <ToolsMockWebhookLogRepository>(
            module.get<ToolsIWebhookLogRepository>(ToolsIWebhookLogRepository)
        );
        mapper = new ToolsWebhookLogMapper();
    });

    describe('main', () => {
        test('ToolsFindWebhookLogQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an webhookLog founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new ToolsFindWebhookLogQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
