import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsFindWebhookByIdService } from '@app/tools/webhook/application/find/tools-find-webhook-by-id.service';
import { ToolsWebhookId } from '@app/tools/webhook/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookByIdService', () => {
    let service: ToolsFindWebhookByIdService;
    let repository: ToolsIWebhookRepository;
    let mockRepository: ToolsMockWebhookRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsFindWebhookByIdService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsFindWebhookByIdService);
        repository = module.get(ToolsIWebhookRepository);
        mockRepository = module.get(ToolsMockWebhookRepository);
    });

    describe('main', () => {
        test('FindWebhookByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find webhook by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new ToolsWebhookId(toolsMockWebhookData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
