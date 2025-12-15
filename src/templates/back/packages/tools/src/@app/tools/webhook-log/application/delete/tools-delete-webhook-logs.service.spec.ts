/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookLogRepository,
    ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogsService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-logs.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogsService', () => {
    let service: ToolsDeleteWebhookLogsService;
    let repository: ToolsIWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteWebhookLogsService,
                ToolsMockWebhookLogRepository,
                {
                    provide: ToolsIWebhookLogRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteWebhookLogsService);
        repository = module.get(ToolsIWebhookLogRepository);
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete webhookLog and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
