import {
  ToolsFindWebhookQuery,
  ToolsIWebhookRepository,
  ToolsMockWebhookRepository,
  ToolsWebhookMapper,
} from '@app/tools/webhook';
import { ToolsFindWebhookQueryHandler } from '@app/tools/webhook/application/find/tools-find-webhook.query-handler';
import { ToolsFindWebhookService } from '@app/tools/webhook/application/find/tools-find-webhook.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookQueryHandler', () => {
  let queryHandler: ToolsFindWebhookQueryHandler;
  let service: ToolsFindWebhookService;
  let repository: ToolsMockWebhookRepository;
  let mapper: ToolsWebhookMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsFindWebhookQueryHandler,
        {
          provide: ToolsIWebhookRepository,
          useClass: ToolsMockWebhookRepository,
        },
        {
          provide: ToolsFindWebhookService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsFindWebhookQueryHandler>(
      ToolsFindWebhookQueryHandler,
    );
    service = module.get<ToolsFindWebhookService>(ToolsFindWebhookService);
    repository = <ToolsMockWebhookRepository>(
      module.get<ToolsIWebhookRepository>(ToolsIWebhookRepository)
    );
    mapper = new ToolsWebhookMapper();
  });

  describe('main', () => {
    test('ToolsFindWebhookQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an webhook founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(new ToolsFindWebhookQuery()),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
