/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { WhatsappModule } from '@api/whatsapp/whatsapp.module';
import { WhatsappIMessageRepository, whatsappMockMessageData, WhatsappMockMessageSeeder } from '@app/whatsapp/message';
import { GraphQLConfigModule } from '@aurora/modules';
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
    let messageRepository: WhatsappIMessageRepository;
    let messageSeeder: WhatsappMockMessageSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                WhatsappModule,
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
                WhatsappMockMessageSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = whatsappMockMessageData;
        app = module.createNestApplication();
        messageRepository = module.get<WhatsappIMessageRepository>(WhatsappIMessageRepository);
        messageSeeder = module.get<WhatsappMockMessageSeeder>(WhatsappMockMessageSeeder);

        // seed mock data in memory database
        await messageRepository.insert(messageSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaMessageId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaMessageId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaMessageId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageTimelineId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                timelineId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageTimelineId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageStatuses property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                statuses: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageStatuses must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageDirection property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                direction: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageDirection must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaContactId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaContactId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaContactId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageType must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessagePayload property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                payload: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessagePayload must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaMessageId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaMessageId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaMessageId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageTimelineId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                timelineId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageTimelineId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageStatuses property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                statuses: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageStatuses must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageDirection property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                direction: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageDirection must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaContactId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaContactId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaContactId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageType must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessagePayload property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                payload: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessagePayload must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageTimelineId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                timelineId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageTimelineId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageConversationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                conversationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageConversationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaMessageId is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaMessageId: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaMessageId is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageWabaContactId is too large, has a maximum length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                wabaContactId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageWabaContactId is too large, has a maximum length of 36');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageContactName is too large, has a maximum length of 127', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                contactName: '********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageContactName is too large, has a maximum length of 127');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageDirection has to be a enum option of INPUT, OUTPUT', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                direction: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageDirection has to be any of this options: INPUT, OUTPUT');
            });
    });
    test('/REST:POST whatsapp/message/create - Got 400 Conflict, MessageType has to be a enum option of BUTTON, CONTACTS, IMAGE, INTERACTIVE, LOCATION, ORDER, REACTION, STICKER, SYSTEM, TEMPLATE, TEXT, UNKNOWN', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappMessageType has to be any of this options: BUTTON, CONTACTS, IMAGE, INTERACTIVE, LOCATION, ORDER, REACTION, STICKER, SYSTEM, TEMPLATE, TEXT, UNKNOWN');
            });
    });

    test('/REST:POST whatsapp/message/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST whatsapp/messages/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/messages/paginate')
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

    test('/REST:POST whatsapp/messages/get', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/messages/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    messageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST whatsapp/message/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'bacb952a-d427-5acd-aba6-56e549809f57',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST whatsapp/message/create', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST whatsapp/message/find', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/find')
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

    test('/REST:POST whatsapp/message/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/find/01900672-4b71-5602-9a79-a28cced57bb6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST whatsapp/message/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/message/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT whatsapp/message/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/message/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'cf102b37-4d8c-5005-92e9-5c001add9936',
            })
            .expect(404);
    });

    test('/REST:PUT whatsapp/message/update', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/message/update')
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

    test('/REST:DELETE whatsapp/message/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/message/delete/744eafc4-3cdf-5435-94cb-6f8891b04b85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE whatsapp/message/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/message/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL whatsappCreateMessage - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateMessageInput!)
                    {
                        whatsappCreateMessage (payload:$payload)
                        {
                            id
                            wabaMessageId
                            timelineId
                            conversationId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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

    test('/GraphQL whatsappPaginateMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        whatsappPaginateMessages (query:$query constraint:$constraint)
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
                expect(res.body.data.whatsappPaginateMessages).toEqual({
                    total: messageSeeder.collectionResponse.length,
                    count: messageSeeder.collectionResponse.length,
                    rows : messageSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL whatsappGetMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappGetMessages (query:$query)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                for (const [index, value] of res.body.data.whatsappGetMessages.entries())
                {
                    expect(messageSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL whatsappCreateMessage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateMessageInput!)
                    {
                        whatsappCreateMessage (payload:$payload)
                        {
                            id
                            wabaMessageId
                            timelineId
                            conversationId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappCreateMessage).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindMessage - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindMessage (query:$query)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                            id: '3094742a-51af-5aeb-8fef-0d5ac171ffe5',
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

    test('/GraphQL whatsappFindMessage', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindMessage (query:$query)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappFindMessage.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindMessageById (id:$id)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e027a624-8a2c-53b2-bcd8-df8ae36a377d',
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

    test('/GraphQL whatsappFindMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindMessageById (id:$id)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappFindMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateMessageByIdInput!)
                    {
                        whatsappUpdateMessageById (payload:$payload)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'f7645ac7-fc0e-5193-acc2-c6d074ad159e',
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

    test('/GraphQL whatsappUpdateMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateMessageByIdInput!)
                    {
                        whatsappUpdateMessageById (payload:$payload)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappUpdateMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateMessages', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateMessagesInput! $query: QueryStatement)
                    {
                        whatsappUpdateMessages (payload:$payload query:$query)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappUpdateMessages[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappDeleteMessageById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteMessageById (id:$id)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '07ca4b57-4552-5fba-be44-67b5bae1e571',
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

    test('/GraphQL whatsappDeleteMessageById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteMessageById (id:$id)
                        {
                            id
                            wabaMessageId
                            statuses
                            direction
                            accountId
                            wabaContactId
                            contactName
                            type
                            payload
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
                expect(res.body.data.whatsappDeleteMessageById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
