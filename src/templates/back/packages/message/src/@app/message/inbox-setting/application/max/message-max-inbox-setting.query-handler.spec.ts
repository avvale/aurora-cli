import { MessageIInboxSettingRepository, MessageMaxInboxSettingQuery, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageMaxInboxSettingQueryHandler } from '@app/message/inbox-setting/application/max/message-max-inbox-setting.query-handler';
import { MessageMaxInboxSettingService } from '@app/message/inbox-setting/application/max/message-max-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMaxInboxSettingQueryHandler', () =>
{
    let queryHandler: MessageMaxInboxSettingQueryHandler;
    let service: MessageMaxInboxSettingService;
    let repository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMaxInboxSettingQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageMaxInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMaxInboxSettingQueryHandler>(MessageMaxInboxSettingQueryHandler);
        service = module.get<MessageMaxInboxSettingService>(MessageMaxInboxSettingService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageMaxInboxSettingQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new MessageMaxInboxSettingQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
