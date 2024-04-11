import { MessageCountInboxSettingQuery, MessageIInboxSettingRepository, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageCountInboxSettingQueryHandler } from '@app/message/inbox-setting/application/count/message-count-inbox-setting.query-handler';
import { MessageCountInboxSettingService } from '@app/message/inbox-setting/application/count/message-count-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountInboxSettingQueryHandler', () =>
{
    let queryHandler: MessageCountInboxSettingQueryHandler;
    let service: MessageCountInboxSettingService;
    let repository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageCountInboxSettingQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageCountInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageCountInboxSettingQueryHandler>(MessageCountInboxSettingQueryHandler);
        service = module.get<MessageCountInboxSettingService>(MessageCountInboxSettingService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageCountInboxSettingQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new MessageCountInboxSettingQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
