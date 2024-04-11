import { MessageGetInboxSettingsQuery, MessageIInboxSettingRepository, MessageInboxSettingMapper, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageGetInboxSettingsQueryHandler } from '@app/message/inbox-setting/application/get/message-get-inbox-settings.query-handler';
import { MessageGetInboxSettingsService } from '@app/message/inbox-setting/application/get/message-get-inbox-settings.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetInboxSettingsQueryHandler', () =>
{
    let queryHandler: MessageGetInboxSettingsQueryHandler;
    let service: MessageGetInboxSettingsService;
    let repository: MessageMockInboxSettingRepository;
    let mapper: MessageInboxSettingMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageGetInboxSettingsQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageGetInboxSettingsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageGetInboxSettingsQueryHandler>(MessageGetInboxSettingsQueryHandler);
        service = module.get<MessageGetInboxSettingsService>(MessageGetInboxSettingsService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
        mapper = new MessageInboxSettingMapper();
    });

    describe('main', () =>
    {
        test('MessageGetInboxSettingsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an inboxSettings founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new MessageGetInboxSettingsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
