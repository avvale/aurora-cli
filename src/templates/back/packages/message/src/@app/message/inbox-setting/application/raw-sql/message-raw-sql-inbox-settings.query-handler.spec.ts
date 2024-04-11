import { MessageIInboxSettingRepository, MessageInboxSettingMapper, MessageMockInboxSettingRepository, MessageRawSQLInboxSettingsQuery } from '@app/message/inbox-setting';
import { MessageRawSQLInboxSettingsQueryHandler } from '@app/message/inbox-setting/application/raw-sql/message-raw-sql-inbox-settings.query-handler';
import { MessageRawSQLInboxSettingsService } from '@app/message/inbox-setting/application/raw-sql/message-raw-sql-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RawSQLInboxSettingsQueryHandler', () =>
{
    let queryHandler: MessageRawSQLInboxSettingsQueryHandler;
    let service: MessageRawSQLInboxSettingsService;
    let repository: MessageMockInboxSettingRepository;
    let mapper: MessageInboxSettingMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageRawSQLInboxSettingsQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageRawSQLInboxSettingsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageRawSQLInboxSettingsQueryHandler>(MessageRawSQLInboxSettingsQueryHandler);
        service = module.get<MessageRawSQLInboxSettingsService>(MessageRawSQLInboxSettingsService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
        mapper = new MessageInboxSettingMapper();
    });

    describe('main', () =>
    {
        test('MessageRawSQLInboxSettingsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxSettings founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageRawSQLInboxSettingsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
