/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookLogRepository,
    toolsMockWebhookLogData,
    ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogByIdService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-log-by-id.service';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogByIdService', () => {
    let service: ToolsDeleteWebhookLogByIdService;
    let repository: ToolsIWebhookLogRepository;
    let mockRepository: ToolsMockWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteWebhookLogByIdService,
                ToolsMockWebhookLogRepository,
                {
                    provide: ToolsIWebhookLogRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteWebhookLogByIdService);
        repository = module.get(ToolsIWebhookLogRepository);
        mockRepository = module.get(ToolsMockWebhookLogRepository);
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete webhookLog and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new ToolsWebhookLogId(toolsMockWebhookLogData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
