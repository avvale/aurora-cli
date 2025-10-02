/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { TenantPolicy } from '@api/iam/shared';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { MessageModule } from '@api/message/message.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { IamAccountResponse } from '@app/iam/account';
import { MessageIInboxRepository, messageMockInboxData, MessageMockInboxSeeder } from '@app/message/inbox';
import { GraphQLConfigModule } from '@aurora/modules';
import { CurrentAccount } from '@aurorajs.dev/core';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('inbox', () =>
{
    let app: INestApplication;
    let inboxRepository: MessageIInboxRepository;
    let inboxSeeder: MessageMockInboxSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                MessageModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MessageMockInboxSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = messageMockInboxData;
        app = module.createNestApplication();
        inboxRepository = module.get<MessageIInboxRepository>(MessageIInboxRepository);
        inboxSeeder = module.get<MessageMockInboxSeeder>(MessageMockInboxSeeder);

        // seed mock data in memory database
        await inboxRepository.insert(inboxSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxId must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSort property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sort: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSort must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxAccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxAccountId must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsImportant property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsImportant must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSentAt property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sentAt: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSentAt must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSubject property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSubject must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxBody property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                body: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxBody must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsRead property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRead: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsRead must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsReadAtLeastOnce property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isReadAtLeastOnce: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsReadAtLeastOnce must be defined, can not be null');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxId must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSort property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sort: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSort must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxAccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxAccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsImportant property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsImportant must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSentAt property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sentAt: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSentAt must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSubject property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSubject must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxBody property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                body: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxBody must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsRead property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRead: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsRead must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsReadAtLeastOnce property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isReadAtLeastOnce: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsReadAtLeastOnce must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxMessageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                messageId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxMessageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxAccountCode is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountCode: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxAccountCode is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSubject is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSubject is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxLink is too large, has a maximum length of 2046', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                link: '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxLink is too large, has a maximum length of 2046');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIcon is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                icon: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIcon is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSort has to be a integer value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sort: 100.10,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSort has to be a integer value');
            });
    });
    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsImportant has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsImportant has to be a boolean value');
            });
    });
    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsInternalLink has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isInternalLink: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsInternalLink has to be a boolean value');
            });
    });
    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsRead has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRead: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsRead has to be a boolean value');
            });
    });
    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxIsReadAtLeastOnce has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isReadAtLeastOnce: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxIsReadAtLeastOnce has to be a boolean value');
            });
    });
    test('/REST:POST message/inbox/create - Got 400 Conflict, InboxSentAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sentAt: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageInboxSentAt has to be a timestamp value');
            });
    });

    test('/REST:POST message/inbox/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST message/inboxes/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inboxes/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: inboxSeeder.collectionResponse.length,
                    count: inboxSeeder.collectionResponse.length,
                    rows : inboxSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST message/inboxes/get', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inboxes/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    inboxSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST message/inbox/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '8f22d79e-af31-5486-bb1f-309702f0fed0',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST message/inbox/create', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST message/inbox/find', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:POST message/inbox/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/find/712a519f-0efd-57c5-bb4a-49bb19b68124')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST message/inbox/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/message/inbox/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT message/inbox/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/message/inbox/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '30e601af-29cd-5e8b-833f-aeef86b6d87c',
            })
            .expect(404);
    });

    test('/REST:PUT message/inbox/update', () =>
    {
        return request(app.getHttpServer())
            .put('/message/inbox/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE message/inbox/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/message/inbox/delete/7e2f4a48-5761-5099-a244-4cbbeda7d606')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE message/inbox/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/message/inbox/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL messageCreateInbox - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateInboxInput!)
                    {
                        messageCreateInbox (payload:$payload)
                        {
                            id
                            tenantIds
                            messageId
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL messagePaginateInboxes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        messagePaginateInboxes (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messagePaginateInboxes).toEqual({
                    total: inboxSeeder.collectionResponse.length,
                    count: inboxSeeder.collectionResponse.length,
                    rows : inboxSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL messageGetInboxes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageGetInboxes (query:$query)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.messageGetInboxes.entries())
                {
                    expect(inboxSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL messageCreateInbox', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateInboxInput!)
                    {
                        messageCreateInbox (payload:$payload)
                        {
                            id
                            tenantIds
                            messageId
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageCreateInbox).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageFindInbox - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindInbox (query:$query)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'af5f1cb4-d34a-5097-8d06-b32591ae16a0',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL messageFindInbox', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindInbox (query:$query)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageFindInbox.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageFindInboxById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindInboxById (id:$id)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '367c02ef-4d79-5e74-8c03-87d9c37c49df',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL messageFindInboxById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindInboxById (id:$id)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageFindInboxById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateInboxById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxByIdInput!)
                    {
                        messageUpdateInboxById (payload:$payload)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '57266756-330a-5dc1-8881-af769e3d7f39',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL messageUpdateInboxById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxByIdInput!)
                    {
                        messageUpdateInboxById (payload:$payload)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageUpdateInboxById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateInboxes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxesInput! $query: QueryStatement)
                    {
                        messageUpdateInboxes (payload:$payload query:$query)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageUpdateInboxes[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageDeleteInboxById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteInboxById (id:$id)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10eb7fc9-2115-591f-9c5e-deba051ef7cd',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL messageDeleteInboxById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteInboxById (id:$id)
                        {
                            id
                            tenantIds
                            sort
                            accountId
                            accountCode
                            isImportant
                            sentAt
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            isRead
                            isReadAtLeastOnce
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.messageDeleteInboxById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await inboxRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
