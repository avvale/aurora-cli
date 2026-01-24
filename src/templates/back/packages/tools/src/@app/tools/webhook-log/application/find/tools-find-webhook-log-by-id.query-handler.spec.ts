import {
  ToolsFindWebhookLogByIdQuery,
  ToolsIWebhookLogRepository,
  toolsMockWebhookLogData,
  ToolsMockWebhookLogRepository,
  ToolsWebhookLogMapper,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogByIdQueryHandler } from '@app/tools/webhook-log/application/find/tools-find-webhook-log-by-id.query-handler';
import { ToolsFindWebhookLogByIdService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogByIdQueryHandler', () => {
  let queryHandler: ToolsFindWebhookLogByIdQueryHandler;
  let service: ToolsFindWebhookLogByIdService;
  let repository: ToolsMockWebhookLogRepository;
  let mapper: ToolsWebhookLogMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsFindWebhookLogByIdQueryHandler,
        {
          provide: ToolsIWebhookLogRepository,
          useClass: ToolsMockWebhookLogRepository,
        },
        {
          provide: ToolsFindWebhookLogByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsFindWebhookLogByIdQueryHandler>(
      ToolsFindWebhookLogByIdQueryHandler,
    );
    service = module.get<ToolsFindWebhookLogByIdService>(
      ToolsFindWebhookLogByIdService,
    );
    repository = <ToolsMockWebhookLogRepository>(
      module.get<ToolsIWebhookLogRepository>(ToolsIWebhookLogRepository)
    );
    mapper = new ToolsWebhookLogMapper();
  });

  describe('main', () => {
    test('FindWebhookLogByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an webhookLog founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new ToolsFindWebhookLogByIdQuery(toolsMockWebhookLogData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
