/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { MessageModule } from '@api/message/message.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
    MessageIInboxSettingRepository,
    messageMockInboxSettingData,
    MessageMockInboxSettingSeeder,
} from '@app/message/inbox-setting';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('inbox-setting', () => {
    let app: INestApplication;
    let inboxSettingRepository: MessageIInboxSettingRepository;
    let inboxSettingSeeder: MessageMockInboxSettingSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                MessageModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => {
                        return {
                            dialect: configService.get('TEST_DATABASE_DIALECT'),
                            storage: configService.get('TEST_DATABASE_STORAGE'),
                            host: configService.get('TEST_DATABASE_HOST'),
                            port: +configService.get('TEST_DATABASE_PORT'),
                            username: configService.get('TEST_DATABASE_USER'),
                            password: configService.get(
                                'TEST_DATABASE_PASSWORD',
                            ),
                            database: configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize: configService.get(
                                'TEST_DATABASE_SYNCHRONIZE',
                            ),
                            logging:
                                configService.get('TEST_DATABASE_LOGGIN') ===
                                'true'
                                    ? console.log
                                    : false,
                            autoLoadModels: true,
                            models: [],
                        };
                    },
                }),
            ],
            providers: [MessageMockInboxSettingSeeder],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = messageMockInboxSettingData;
        app = module.createNestApplication();
        inboxSettingRepository = module.get<MessageIInboxSettingRepository>(
            MessageIInboxSettingRepository,
        );
        inboxSettingSeeder = module.get<MessageMockInboxSettingSeeder>(
            MessageMockInboxSettingSeeder,
        );

        // seed mock data in memory database
        await inboxSettingRepository.insert(
            inboxSettingSeeder.collectionSource,
        );

        await app.init();
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingAccountId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingAccountId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingLastReadMessageRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                lastReadMessageRowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingLastReadMessageRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingAccountId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingAccountId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingLastReadMessageRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                lastReadMessageRowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingLastReadMessageRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 400 Conflict, InboxSettingAccountId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for MessageInboxSettingAccountId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST message/inbox-setting/create - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST message/inbox-settings/paginate', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-settings/paginate')
            .set('Accept', 'application/json')
            .send({
                query: {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    total: inboxSettingSeeder.collectionResponse.length,
                    count: inboxSettingSeeder.collectionResponse.length,
                    rows: inboxSettingSeeder.collectionResponse
                        .map((item) =>
                            expect.objectContaining(
                                _.omit(item, [
                                    'createdAt',
                                    'updatedAt',
                                    'deletedAt',
                                ]),
                            ),
                        )
                        .slice(0, 5),
                });
            });
    });

    test('/REST:POST message/inbox-settings/get', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-settings/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    inboxSettingSeeder.collectionResponse.map((item) =>
                        expect.objectContaining(
                            _.omit(item, [
                                'createdAt',
                                'updatedAt',
                                'deletedAt',
                            ]),
                        ),
                    ),
                );
            });
    });

    test('/REST:POST message/inbox-setting/find - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '01a2c1d1-5c03-52b3-a05e-6f3b100fd11d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST message/inbox-setting/create', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST message/inbox-setting/find', () => {
        return request(app.getHttpServer())
            .post('/message/inbox-setting/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:POST message/inbox-setting/find/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post(
                '/message/inbox-setting/find/615ee49e-2840-5ede-ad93-b3e06d9cf0c4',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST message/inbox-setting/find/{id}', () => {
        return request(app.getHttpServer())
            .post(
                '/message/inbox-setting/find/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:PUT message/inbox-setting/update - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .put('/message/inbox-setting/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '0d926dbd-a75d-52ae-8af4-c8b8793fa5fa',
            })
            .expect(404);
    });

    test('/REST:PUT message/inbox-setting/update', () => {
        return request(app.getHttpServer())
            .put('/message/inbox-setting/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:DELETE message/inbox-setting/delete/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .delete(
                '/message/inbox-setting/delete/4760474f-d960-5dc9-a60e-5b1c13ef5c1c',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE message/inbox-setting/delete/{id}', () => {
        return request(app.getHttpServer())
            .delete(
                '/message/inbox-setting/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL messageCreateInboxSetting - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateInboxSettingInput!)
                    {
                        messageCreateInboxSetting (payload:$payload)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                        }
                    }
                `,
                variables: {
                    payload: _.omit(mockData[0], [
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ]),
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(409);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('already exist in database');
            });
    });

    test('/GraphQL messagePaginateInboxSettings', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        messagePaginateInboxSettings (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body.data.messagePaginateInboxSettings).toEqual({
                    total: inboxSettingSeeder.collectionResponse.length,
                    count: inboxSettingSeeder.collectionResponse.length,
                    rows: inboxSettingSeeder.collectionResponse
                        .map((item) =>
                            expect.objectContaining(
                                _.omit(item, [
                                    'createdAt',
                                    'updatedAt',
                                    'deletedAt',
                                ]),
                            ),
                        )
                        .slice(0, 5),
                });
            });
    });

    test('/GraphQL messageGetInboxSettings', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageGetInboxSettings (query:$query)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then((res) => {
                for (const [
                    index,
                    value,
                ] of res.body.data.messageGetInboxSettings.entries()) {
                    expect(
                        inboxSettingSeeder.collectionResponse[index],
                    ).toEqual(
                        expect.objectContaining(
                            _.omit(value, [
                                'createdAt',
                                'updatedAt',
                                'deletedAt',
                            ]),
                        ),
                    );
                }
            });
    });

    test('/GraphQL messageCreateInboxSetting', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageCreateInboxSettingInput!)
                    {
                        messageCreateInboxSetting (payload:$payload)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
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
            .then((res) => {
                expect(res.body.data.messageCreateInboxSetting).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL messageFindInboxSetting - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindInboxSetting (query:$query)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: '64d856a8-3064-586a-80e8-818907dd3107',
                        },
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL messageFindInboxSetting', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        messageFindInboxSetting (query:$query)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body.data.messageFindInboxSetting.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL messageFindInboxSettingById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindInboxSettingById (id:$id)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '44aea482-3597-560e-b63f-d57eadf4641e',
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL messageFindInboxSettingById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        messageFindInboxSettingById (id:$id)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
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
            .then((res) => {
                expect(
                    res.body.data.messageFindInboxSettingById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateInboxSettingById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxSettingByIdInput!)
                    {
                        messageUpdateInboxSettingById (payload:$payload)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '85dbf827-6e72-591a-90dd-229f7e7300d3',
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL messageUpdateInboxSettingById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxSettingByIdInput!)
                    {
                        messageUpdateInboxSettingById (payload:$payload)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
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
            .then((res) => {
                expect(
                    res.body.data.messageUpdateInboxSettingById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageUpdateInboxSettings', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:MessageUpdateInboxSettingsInput! $query: QueryStatement)
                    {
                        messageUpdateInboxSettings (payload:$payload query:$query)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
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
            .then((res) => {
                expect(
                    res.body.data.messageUpdateInboxSettings[0].id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL messageDeleteInboxSettingById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteInboxSettingById (id:$id)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1542cd50-e1d4-5ac8-98f9-4e13a0501be8',
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL messageDeleteInboxSettingById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteInboxSettingById (id:$id)
                        {
                            id
                            rowId
                            accountId
                            lastReadMessageRowId
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
            .then((res) => {
                expect(
                    res.body.data.messageDeleteInboxSettingById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () => {
        await inboxSettingRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
