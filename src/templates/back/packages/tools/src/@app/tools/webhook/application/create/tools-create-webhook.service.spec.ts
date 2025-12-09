/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsCreateWebhookService } from '@app/tools/webhook/application/create/tools-create-webhook.service';
import {
    ToolsWebhookEndpoint,
    ToolsWebhookEvents,
    ToolsWebhookExternalId,
    ToolsWebhookId,
    ToolsWebhookMeta,
    ToolsWebhookName,
    ToolsWebhookRowId,
    ToolsWebhookSecret,
    ToolsWebhookService,
} from '@app/tools/webhook/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookService', () => {
    let service: ToolsCreateWebhookService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsCreateWebhookService,
                ToolsMockWebhookRepository,
                {
                    provide: ToolsIWebhookRepository,
                    useValue: {
                        create: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsCreateWebhookService);
    });

    describe('main', () => {
        test('ToolsCreateWebhookService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create a webhook and emit event', async () => {
            expect(
                await service.main({
                    id: new ToolsWebhookId(toolsMockWebhookData[0].id),
                    rowId: new ToolsWebhookRowId(toolsMockWebhookData[0].rowId),
                    name: new ToolsWebhookName(toolsMockWebhookData[0].name),
                    service: new ToolsWebhookService(
                        toolsMockWebhookData[0].service,
                    ),
                    endpoint: new ToolsWebhookEndpoint(
                        toolsMockWebhookData[0].endpoint,
                    ),
                    externalId: new ToolsWebhookExternalId(
                        toolsMockWebhookData[0].externalId,
                    ),
                    events: new ToolsWebhookEvents(
                        toolsMockWebhookData[0].events,
                    ),
                    secret: new ToolsWebhookSecret(
                        toolsMockWebhookData[0].secret,
                    ),
                    meta: new ToolsWebhookMeta(toolsMockWebhookData[0].meta),
                }),
            ).toBe(undefined);
        });
    });
});
