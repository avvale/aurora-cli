// export commands
export { MessageCreateInboxSettingCommand } from './application/create/message-create-inbox-setting.command';
export { MessageCreateInboxSettingsCommand } from './application/create/message-create-inbox-settings.command';
export { MessageUpdateInboxSettingByIdCommand } from './application/update/message-update-inbox-setting-by-id.command';
export { MessageUpdateInboxSettingsCommand } from './application/update/message-update-inbox-settings.command';
export { MessageUpdateAndIncrementInboxSettingsCommand } from './application/update/message-update-and-increment-inbox-settings.command';
export { MessageUpsertInboxSettingCommand } from './application/upsert/message-upsert-inbox-setting.command';
export { MessageDeleteInboxSettingByIdCommand } from './application/delete/message-delete-inbox-setting-by-id.command';
export { MessageDeleteInboxSettingsCommand } from './application/delete/message-delete-inbox-settings.command';

// export queries
export { MessagePaginateInboxSettingsQuery } from './application/paginate/message-paginate-inbox-settings.query';
export { MessageGetInboxSettingsQuery } from './application/get/message-get-inbox-settings.query';
export { MessageFindInboxSettingQuery } from './application/find/message-find-inbox-setting.query';
export { MessageFindInboxSettingByIdQuery } from './application/find/message-find-inbox-setting-by-id.query';
export { MessageRawSQLInboxSettingsQuery } from './application/raw-sql/message-raw-sql-inbox-settings.query';
export { MessageCountInboxSettingQuery } from './application/count/message-count-inbox-setting.query';
export { MessageMaxInboxSettingQuery } from './application/max/message-max-inbox-setting.query';
export { MessageMinInboxSettingQuery } from './application/min/message-min-inbox-setting.query';
export { MessageSumInboxSettingQuery } from './application/sum/message-sum-inbox-setting.query';

// export mocks
export { messageMockInboxSettingData } from './infrastructure/mock/message-mock-inbox-setting.data';
export { MessageMockInboxSettingSeeder } from './infrastructure/mock/message-mock-inbox-setting.seeder';
export { MessageMockInboxSettingRepository } from './infrastructure/mock/message-mock-inbox-setting.repository';

// export events
export { MessageAddInboxSettingsContextEvent } from './application/events/message-add-inbox-settings-context.event';
export { MessageCreatedInboxSettingsEvent } from './application/events/message-created-inbox-settings.event';
export { MessageCreatedInboxSettingEvent } from './application/events/message-created-inbox-setting.event';
export { MessageDeletedInboxSettingsEvent } from './application/events/message-deleted-inbox-settings.event';
export { MessageDeletedInboxSettingEvent } from './application/events/message-deleted-inbox-setting.event';
export { MessageUpdatedInboxSettingsEvent } from './application/events/message-updated-inbox-settings.event';
export { MessageUpdatedInboxSettingEvent } from './application/events/message-updated-inbox-setting.event';
export { MessageUpdatedAndIncrementedInboxSettingsEvent } from './application/events/message-updated-and-incremented-inbox-settings.event';
export { MessageUpdatedAndIncrementedInboxSettingEvent } from './application/events/message-updated-and-incremented-inbox-setting.event';

// export command handlers
// can not export application command handlers, because Nest can't resolve dependencies

// export command services
// can not export application services, because Nest can't resolve dependencies

// domain
export { MessageInboxSetting } from './domain/message-inbox-setting.aggregate';
export { MessageInboxSettingMapper } from './domain/message-inbox-setting.mapper';
export { MessageIInboxSettingRepository } from './domain/message-inbox-setting.repository';
export { MessageInboxSettingResponse } from './domain/message-inbox-setting.response';

// infrastructure
export { MessageInboxSettingModel } from './infrastructure/sequelize/message-sequelize-inbox-setting.model';
export { MessageSequelizeInboxSettingRepository } from './infrastructure/sequelize/message-sequelize-inbox-setting.repository';

// sagas
export { MessageInboxSettingSagas } from './application/sagas/message-inbox-setting.sagas';

// command handlers
import { MessageCreateInboxSettingCommandHandler } from './application/create/message-create-inbox-setting.command-handler';
import { MessageCreateInboxSettingsCommandHandler } from './application/create/message-create-inbox-settings.command-handler';
import { MessageUpdateInboxSettingByIdCommandHandler } from './application/update/message-update-inbox-setting-by-id.command-handler';
import { MessageUpdateInboxSettingsCommandHandler } from './application/update/message-update-inbox-settings.command-handler';
import { MessageUpdateAndIncrementInboxSettingsCommandHandler } from './application/update/message-update-and-increment-inbox-settings.command-handler';
import { MessageUpsertInboxSettingCommandHandler } from './application/upsert/message-upsert-inbox-setting.command-handler';
import { MessageDeleteInboxSettingByIdCommandHandler } from './application/delete/message-delete-inbox-setting-by-id.command-handler';
import { MessageDeleteInboxSettingsCommandHandler } from './application/delete/message-delete-inbox-settings.command-handler';

// query handlers
import { MessagePaginateInboxSettingsQueryHandler } from './application/paginate/message-paginate-inbox-settings.query-handler';
import { MessageGetInboxSettingsQueryHandler } from './application/get/message-get-inbox-settings.query-handler';
import { MessageFindInboxSettingQueryHandler } from './application/find/message-find-inbox-setting.query-handler';
import { MessageFindInboxSettingByIdQueryHandler } from './application/find/message-find-inbox-setting-by-id.query-handler';
import { MessageRawSQLInboxSettingsQueryHandler } from './application/raw-sql/message-raw-sql-inbox-settings.query-handler';
import { MessageCountInboxSettingQueryHandler } from './application/count/message-count-inbox-setting.query-handler';
import { MessageMaxInboxSettingQueryHandler } from './application/max/message-max-inbox-setting.query-handler';
import { MessageMinInboxSettingQueryHandler } from './application/min/message-min-inbox-setting.query-handler';
import { MessageSumInboxSettingQueryHandler } from './application/sum/message-sum-inbox-setting.query-handler';

// event handlers
import { MessageCreatedInboxSettingEventHandler } from './application/events/message-created-inbox-setting.event-handler';
import { MessageCreatedInboxSettingsEventHandler } from './application/events/message-created-inbox-settings.event-handler';
import { MessageUpdatedInboxSettingEventHandler } from './application/events/message-updated-inbox-setting.event-handler';
import { MessageUpdatedInboxSettingsEventHandler } from './application/events/message-updated-inbox-settings.event-handler';
import { MessageUpdatedAndIncrementedInboxSettingsEventHandler } from './application/events/message-updated-and-incremented-inbox-settings.event-handler';
import { MessageDeletedInboxSettingEventHandler } from './application/events/message-deleted-inbox-setting.event-handler';
import { MessageDeletedInboxSettingsEventHandler } from './application/events/message-deleted-inbox-settings.event-handler';

// services
import { MessageCreateInboxSettingService } from './application/create/message-create-inbox-setting.service';
import { MessageCreateInboxSettingsService } from './application/create/message-create-inbox-settings.service';
import { MessagePaginateInboxSettingsService } from './application/paginate/message-paginate-inbox-settings.service';
import { MessageGetInboxSettingsService } from './application/get/message-get-inbox-settings.service';
import { MessageFindInboxSettingService } from './application/find/message-find-inbox-setting.service';
import { MessageFindInboxSettingByIdService } from './application/find/message-find-inbox-setting-by-id.service';
import { MessageRawSQLInboxSettingsService } from './application/raw-sql/message-raw-sql-inbox-settings.service';
import { MessageCountInboxSettingService } from './application/count/message-count-inbox-setting.service';
import { MessageMaxInboxSettingService } from './application/max/message-max-inbox-setting.service';
import { MessageMinInboxSettingService } from './application/min/message-min-inbox-setting.service';
import { MessageSumInboxSettingService } from './application/sum/message-sum-inbox-setting.service';
import { MessageUpdateInboxSettingByIdService } from './application/update/message-update-inbox-setting-by-id.service';
import { MessageUpdateInboxSettingsService } from './application/update/message-update-inbox-settings.service';
import { MessageUpdateAndIncrementInboxSettingsService } from './application/update/message-update-and-increment-inbox-settings.service';
import { MessageUpsertInboxSettingService } from './application/upsert/message-upsert-inbox-setting.service';
import { MessageDeleteInboxSettingByIdService } from './application/delete/message-delete-inbox-setting-by-id.service';
import { MessageDeleteInboxSettingsService } from './application/delete/message-delete-inbox-settings.service';

export const MessageInboxSettingHandlers = [
    // commands
    MessageCreateInboxSettingCommandHandler,
    MessageCreateInboxSettingsCommandHandler,
    MessageUpdateInboxSettingByIdCommandHandler,
    MessageUpdateInboxSettingsCommandHandler,
    MessageUpdateAndIncrementInboxSettingsCommandHandler,
    MessageUpsertInboxSettingCommandHandler,
    MessageDeleteInboxSettingByIdCommandHandler,
    MessageDeleteInboxSettingsCommandHandler,

    // queries
    MessagePaginateInboxSettingsQueryHandler,
    MessageGetInboxSettingsQueryHandler,
    MessageFindInboxSettingQueryHandler,
    MessageFindInboxSettingByIdQueryHandler,
    MessageRawSQLInboxSettingsQueryHandler,
    MessageCountInboxSettingQueryHandler,
    MessageMaxInboxSettingQueryHandler,
    MessageMinInboxSettingQueryHandler,
    MessageSumInboxSettingQueryHandler,

    // events
    MessageCreatedInboxSettingEventHandler,
    MessageCreatedInboxSettingsEventHandler,
    MessageUpdatedInboxSettingEventHandler,
    MessageUpdatedInboxSettingsEventHandler,
    MessageUpdatedAndIncrementedInboxSettingsEventHandler,
    MessageDeletedInboxSettingEventHandler,
    MessageDeletedInboxSettingsEventHandler,
];

export const MessageInboxSettingServices = [
    MessageCreateInboxSettingService,
    MessageCreateInboxSettingsService,
    MessagePaginateInboxSettingsService,
    MessageGetInboxSettingsService,
    MessageFindInboxSettingService,
    MessageFindInboxSettingByIdService,
    MessageRawSQLInboxSettingsService,
    MessageCountInboxSettingService,
    MessageMaxInboxSettingService,
    MessageMinInboxSettingService,
    MessageSumInboxSettingService,
    MessageUpdateInboxSettingByIdService,
    MessageUpdateInboxSettingsService,
    MessageUpdateAndIncrementInboxSettingsService,
    MessageUpsertInboxSettingService,
    MessageDeleteInboxSettingByIdService,
    MessageDeleteInboxSettingsService,
];