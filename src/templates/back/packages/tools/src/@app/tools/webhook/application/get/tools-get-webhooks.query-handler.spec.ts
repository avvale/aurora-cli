import {
    ToolsGetWebhooksQuery,
    ToolsIWebhookRepository,
    ToolsMockWebhookRepository,
    ToolsWebhookMapper,
} from '@app/tools/webhook';
import { ToolsGetWebhooksQueryHandler } from '@app/tools/webhook/application/get/tools-get-webhooks.query-handler';
import { ToolsGetWebhooksService } from '@app/tools/webhook/application/get/tools-get-webhooks.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetWebhooksQueryHandler', () => {
    let queryHandler: ToolsGetWebhooksQueryHandler;
    let service: ToolsGetWebhooksService;
    let repository: ToolsMockWebhookRepository;
    let mapper: ToolsWebhookMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsGetWebhooksQueryHandler,
                {
                    provide: ToolsIWebhookRepository,
                    useClass: ToolsMockWebhookRepository,
                },
                {
                    provide: ToolsGetWebhooksService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsGetWebhooksQueryHandler>(
            ToolsGetWebhooksQueryHandler,
        );
        service = module.get<ToolsGetWebhooksService>(ToolsGetWebhooksService);
        repository = <ToolsMockWebhookRepository>(
            module.get<ToolsIWebhookRepository>(ToolsIWebhookRepository)
        );
        mapper = new ToolsWebhookMapper();
    });

    describe('main', () => {
        test('ToolsGetWebhooksQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an webhooks founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new ToolsGetWebhooksQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
