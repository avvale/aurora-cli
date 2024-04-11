/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { TenantPolicy } from '@api/iam/shared';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { MessageModule } from '@api/message/message.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { IamAccountResponse } from '@app/iam/account';
import { MessageIMessageRepository, messageMockMessageData, MessageMockMessageSeeder } from '@app/message/message';
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

describe('message', () =>
{
    let app: INestApplication;
    let messageRepository: MessageIMessageRepository;
    let messageSeeder: MessageMockMessageSeeder;

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
                MessageMockMessageSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = messageMockMessageData;
        app = module.createNestApplication();
        messageRepository = module.get<MessageIMessageRepository>(MessageIMessageRepository);
        messageSeeder = module.get<MessageMockMessageSeeder>(MessageMockMessageSeeder);

        // seed mock data in memory database
        await messageRepository.insert(messageSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageId must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageStatus property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                status: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageStatus must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageIsImportant property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageIsImportant must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageSubject property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageSubject must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageBody property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                body: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageBody must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageTotalRecipients property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalRecipients: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageTotalRecipients must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageReads property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                reads: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageReads must be defined, can not be null');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageStatus property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                status: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageStatus must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageIsImportant property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageIsImportant must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageSubject property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageSubject must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageBody property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                body: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageBody must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageTotalRecipients property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalRecipients: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageTotalRecipients must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageReads property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                reads: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageReads must be defined, can not be undefined');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageSubject is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageSubject is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageLink is too large, has a maximum length of 2046', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                link: '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageLink is too large, has a maximum length of 2046');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageIcon is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                icon: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageIcon is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST message/message/create - Got 400 Conflict, MessageTotalRecipients has to be a integer value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalRecipients: 100.10,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageTotalRecipients has to be a integer value');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageReads has to be a integer value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                reads: 100.10,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageReads has to be a integer value');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageTotalRecipients must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                totalRecipients: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical Value for MessageMessageTotalRecipients must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageReads must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                reads: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical Value for MessageMessageReads must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageIsImportant has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isImportant: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageIsImportant has to be a boolean value');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageIsInternalLink has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isInternalLink: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageIsInternalLink has to be a boolean value');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageStatus has to be a enum option of DRAFT, PENDING, SENT', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                status: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageStatus has to be any of this options: DRAFT, PENDING, SENT');
            });
    });
    test('/REST:POST message/message/create - Got 400 Conflict, MessageSendAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sendAt: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for MessageMessageSendAt has to be a timestamp value');
            });
    });

    test('/REST:POST message/message/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST message/messages/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/message/messages/paginate')
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
                    total: messageSeeder.collectionResponse.length,
                    count: messageSeeder.collectionResponse.length,
                    rows : messageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST message/messages/get', () =>
    {
        return request(app.getHttpServer())
            .post('/message/messages/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    messageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST message/message/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '4122c24f-9cc1-5ef0-b37b-deef30a6160c',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST message/message/create', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST message/message/find', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/find')
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

    test('/REST:POST message/message/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/find/272d64b5-63a4-50bd-a8d4-6aeba1d57705')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST message/message/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/message/message/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT message/message/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/message/message/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '16d51bf9-1629-5e72-ab38-f719d7f50732',
            })
            .expect(404);
    });

    test('/REST:PUT message/message/update', () =>
    {
        return request(app.getHttpServer())
            .put('/message/message/update')
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

    test('/REST:DELETE message/message/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/message/message/delete/ac4e01e4-711b-58cc-95fd-6bd1df7c7e98')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE message/message/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/message/message/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL messageCreateMessage - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateMessageInput!)
                    {
                        messageCreateMessage (payload:$payload)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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

    test('/GraphQL messagePaginateMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        messagePaginateMessages (query:$query constraint:$constraint)
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
                expect(res.body.data.messagePaginateMessages).toEqual({
                    total: messageSeeder.collectionResponse.length,
                    count: messageSeeder.collectionResponse.length,
                    rows : messageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL messageGetMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageGetMessages (query:$query)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                for (const [index, value] of res.body.data.messageGetMessages.entries())
                {
                    expect(messageSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL messageCreateMessage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateMessageInput!)
                    {
                        messageCreateMessage (payload:$payload)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageCreateMessage).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageFindMessage - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindMessage (query:$query)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                            id: '37534922-00fc-5a08-961d-0663c93812f5',
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

    test('/GraphQL messageFindMessage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindMessage (query:$query)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageFindMessage.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageFindMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindMessageById (id:$id)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3b45d200-1e4d-5dfe-bc8d-3866de2f5f68',
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

    test('/GraphQL messageFindMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindMessageById (id:$id)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageFindMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateMessageByIdInput!)
                    {
                        messageUpdateMessageById (payload:$payload)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7d5a9894-c589-55d5-8311-8eeed94a71d7',
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

    test('/GraphQL messageUpdateMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateMessageByIdInput!)
                    {
                        messageUpdateMessageById (payload:$payload)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageUpdateMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateMessagesInput! $query: QueryStatement)
                    {
                        messageUpdateMessages (payload:$payload query:$query)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageUpdateMessages[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageDeleteMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteMessageById (id:$id)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9936a0b7-b534-59ad-9658-a79282a50341',
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

    test('/GraphQL messageDeleteMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteMessageById (id:$id)
                        {
                            id
                            tenantIds
                            status
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            sendAt
                            isImportant
                            subject
                            body
                            link
                            isInternalLink
                            image
                            icon
                            attachments
                            totalRecipients
                            reads
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
                expect(res.body.data.messageDeleteMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await messageRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
