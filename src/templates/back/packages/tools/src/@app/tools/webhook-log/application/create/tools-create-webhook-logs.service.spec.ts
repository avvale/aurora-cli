/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsCreateWebhookLogsService } from '@app/tools/webhook-log/application/create/tools-create-webhook-logs.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogsService', () => {
    let service: ToolsCreateWebhookLogsService;
    let mockRepository: ToolsMockWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsCreateWebhookLogsService,
                ToolsMockWebhookLogRepository,
                {
                    provide: ToolsIWebhookLogRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsCreateWebhookLogsService);
        mockRepository = module.get(ToolsMockWebhookLogRepository);
    });

    describe('main', () => {
        test('CreateWebhookLogsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create webhookLogs and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
