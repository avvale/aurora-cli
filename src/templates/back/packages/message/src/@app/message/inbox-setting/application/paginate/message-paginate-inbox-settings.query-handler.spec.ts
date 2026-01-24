import {
  MessageIInboxSettingRepository,
  MessageMockInboxSettingRepository,
  MessagePaginateInboxSettingsQuery,
} from '@app/message/inbox-setting';
import { MessagePaginateInboxSettingsQueryHandler } from '@app/message/inbox-setting/application/paginate/message-paginate-inbox-settings.query-handler';
import { MessagePaginateInboxSettingsService } from '@app/message/inbox-setting/application/paginate/message-paginate-inbox-settings.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxSettingsQueryHandler', () => {
  let queryHandler: MessagePaginateInboxSettingsQueryHandler;
  let service: MessagePaginateInboxSettingsService;
  let repository: MessageMockInboxSettingRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagePaginateInboxSettingsQueryHandler,
        {
          provide: MessageIInboxSettingRepository,
          useClass: MessageMockInboxSettingRepository,
        },
        {
          provide: MessagePaginateInboxSettingsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<MessagePaginateInboxSettingsQueryHandler>(
      MessagePaginateInboxSettingsQueryHandler,
    );
    service = module.get<MessagePaginateInboxSettingsService>(
      MessagePaginateInboxSettingsService,
    );
    repository = <MessageMockInboxSettingRepository>(
      module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository)
    );
  });

  describe('main', () => {
    test('MessagePaginateInboxSettingsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an inboxSettings paginated', async () => {
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
          new MessagePaginateInboxSettingsQuery({
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
