import { MessageIInboxSettingRepository, MessageMinInboxSettingQuery, MessageMockInboxSettingRepository } from '@app/message/inbox-setting';
import { MessageMinInboxSettingQueryHandler } from '@app/message/inbox-setting/application/min/message-min-inbox-setting.query-handler';
import { MessageMinInboxSettingService } from '@app/message/inbox-setting/application/min/message-min-inbox-setting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageMinInboxSettingQueryHandler', () =>
{
    let queryHandler: MessageMinInboxSettingQueryHandler;
    let service: MessageMinInboxSettingService;
    let repository: MessageMockInboxSettingRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageMinInboxSettingQueryHandler,
                {
                    provide : MessageIInboxSettingRepository,
                    useClass: MessageMockInboxSettingRepository,
                },
                {
                    provide : MessageMinInboxSettingService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<MessageMinInboxSettingQueryHandler>(MessageMinInboxSettingQueryHandler);
        service = module.get<MessageMinInboxSettingService>(MessageMinInboxSettingService);
        repository = <MessageMockInboxSettingRepository>module.get<MessageIInboxSettingRepository>(MessageIInboxSettingRepository);
    });

    describe('main', () =>
    {
        test('MessageMinInboxSettingQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new MessageMinInboxSettingQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
