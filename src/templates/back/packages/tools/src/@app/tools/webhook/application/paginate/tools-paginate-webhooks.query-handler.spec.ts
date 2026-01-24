import {
  ToolsIWebhookRepository,
  ToolsMockWebhookRepository,
  ToolsPaginateWebhooksQuery,
} from '@app/tools/webhook';
import { ToolsPaginateWebhooksQueryHandler } from '@app/tools/webhook/application/paginate/tools-paginate-webhooks.query-handler';
import { ToolsPaginateWebhooksService } from '@app/tools/webhook/application/paginate/tools-paginate-webhooks.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhooksQueryHandler', () => {
  let queryHandler: ToolsPaginateWebhooksQueryHandler;
  let service: ToolsPaginateWebhooksService;
  let repository: ToolsMockWebhookRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsPaginateWebhooksQueryHandler,
        {
          provide: ToolsIWebhookRepository,
          useClass: ToolsMockWebhookRepository,
        },
        {
          provide: ToolsPaginateWebhooksService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<ToolsPaginateWebhooksQueryHandler>(
      ToolsPaginateWebhooksQueryHandler,
    );
    service = module.get<ToolsPaginateWebhooksService>(
      ToolsPaginateWebhooksService,
    );
    repository = <ToolsMockWebhookRepository>(
      module.get<ToolsIWebhookRepository>(ToolsIWebhookRepository)
    );
  });

  describe('main', () => {
    test('ToolsPaginateWebhooksQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an webhooks paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new ToolsPaginateWebhooksQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
