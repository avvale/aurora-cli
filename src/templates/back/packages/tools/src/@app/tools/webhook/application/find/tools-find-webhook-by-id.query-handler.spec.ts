import {
    ToolsFindWebhookByIdQuery,
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookRepository,
    ToolsWebhookMapper,
} from '@app/tools/webhook';
import { ToolsFindWebhookByIdQueryHandler } from '@app/tools/webhook/application/find/tools-find-webhook-by-id.query-handler';
import { ToolsFindWebhookByIdService } from '@app/tools/webhook/application/find/tools-find-webhook-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookByIdQueryHandler', () => {
    let queryHandler: ToolsFindWebhookByIdQueryHandler;
    let service: ToolsFindWebhookByIdService;
    let repository: ToolsMockWebhookRepository;
    let mapper: ToolsWebhookMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsFindWebhookByIdQueryHandler,
                {
                    provide: ToolsIWebhookRepository,
                    useClass: ToolsMockWebhookRepository,
                },
                {
                    provide: ToolsFindWebhookByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<ToolsFindWebhookByIdQueryHandler>(
            ToolsFindWebhookByIdQueryHandler,
        );
        service = module.get<ToolsFindWebhookByIdService>(
            ToolsFindWebhookByIdService,
        );
        repository = <ToolsMockWebhookRepository>(
            module.get<ToolsIWebhookRepository>(ToolsIWebhookRepository)
        );
        mapper = new ToolsWebhookMapper();
    });

    describe('main', () => {
        test('FindWebhookByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an webhook founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new ToolsFindWebhookByIdQuery(toolsMockWebhookData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
