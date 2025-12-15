import {
    ToolsIWebhookLogRepository,
    toolsMockWebhookLogData,
    ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogByIdService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log-by-id.service';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogByIdService', () => {
    let service: ToolsFindWebhookLogByIdService;
    let repository: ToolsIWebhookLogRepository;
    let mockRepository: ToolsMockWebhookLogRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindWebhookLogByIdService,
                ToolsMockWebhookLogRepository,
                {
                    provide: ToolsIWebhookLogRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsFindWebhookLogByIdService);
        repository = module.get(ToolsIWebhookLogRepository);
        mockRepository = module.get(ToolsMockWebhookLogRepository);
    });

    describe('main', () => {
        test('FindWebhookLogByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find webhookLog by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new ToolsWebhookLogId(toolsMockWebhookLogData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
