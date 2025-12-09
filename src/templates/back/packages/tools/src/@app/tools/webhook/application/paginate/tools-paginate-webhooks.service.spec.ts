import {
    ToolsIWebhookRepository,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsPaginateWebhooksService } from '@app/tools/webhook/application/paginate/tools-paginate-webhooks.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhooksService', () => {
    let service: ToolsPaginateWebhooksService;
    let repository: ToolsIWebhookRepository;
    let mockRepository: ToolsMockWebhookRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsPaginateWebhooksService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsPaginateWebhooksService);
        repository = module.get(ToolsIWebhookRepository);
        mockRepository = module.get(ToolsMockWebhookRepository);
    });

    describe('main', () => {
        test('ToolsPaginateWebhooksService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate webhooks', async () => {
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
