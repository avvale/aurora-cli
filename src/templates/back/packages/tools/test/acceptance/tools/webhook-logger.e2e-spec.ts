/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import {
    ToolsIWebhookLoggerRepository,
    toolsMockWebhookLoggerData,
    ToolsMockWebhookLoggerSeeder,
} from '@app/tools/webhook-logger';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('webhook-logger', () => {
    let app: INestApplication;
    let webhookLoggerRepository: ToolsIWebhookLoggerRepository;
    let webhookLoggerSeeder: ToolsMockWebhookLoggerSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                ToolsModule,
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
            providers: [ToolsMockWebhookLoggerSeeder],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = toolsMockWebhookLoggerData;
        app = module.createNestApplication();
        webhookLoggerRepository = module.get<ToolsIWebhookLoggerRepository>(
            ToolsIWebhookLoggerRepository,
        );
        webhookLoggerSeeder = module.get<ToolsMockWebhookLoggerSeeder>(
            ToolsMockWebhookLoggerSeeder,
        );

        // seed mock data in memory database
        await webhookLoggerRepository.insert(
            webhookLoggerSeeder.collectionSource,
        );

        await app.init();
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerUrl property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerUrl must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerUrl property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerUrl must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 400 Conflict, WebhookLoggerUrl is too large, has a maximum length of 2046', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookLoggerUrl is too large, has a maximum length of 2046',
                );
            });
    });

    test('/REST:POST tools/webhook-logger/create - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST tools/webhook-loggers/paginate', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-loggers/paginate')
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
                    total: webhookLoggerSeeder.collectionResponse.length,
                    count: webhookLoggerSeeder.collectionResponse.length,
                    rows: webhookLoggerSeeder.collectionResponse
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

    test('/REST:POST tools/webhook-loggers/get', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-loggers/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    webhookLoggerSeeder.collectionResponse.map((item) =>
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

    test('/REST:POST tools/webhook-logger/find - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '61de6480-ca75-53f4-87b9-dfdfd1174dd7',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST tools/webhook-logger/create', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST tools/webhook-logger/find', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook-logger/find')
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

    test('/REST:POST tools/webhook-logger/find/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post(
                '/tools/webhook-logger/find/bae7e139-ec1e-5864-8e78-889613276c2b',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST tools/webhook-logger/find/{id}', () => {
        return request(app.getHttpServer())
            .post(
                '/tools/webhook-logger/find/5b19d6ac-4081-573b-96b3-56964d5326a8',
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

    test('/REST:PUT tools/webhook-logger/update - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .put('/tools/webhook-logger/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '2dc65410-d25e-50c9-8495-6d2ea5b9b164',
            })
            .expect(404);
    });

    test('/REST:PUT tools/webhook-logger/update', () => {
        return request(app.getHttpServer())
            .put('/tools/webhook-logger/update')
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

    test('/REST:DELETE tools/webhook-logger/delete/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .delete(
                '/tools/webhook-logger/delete/9a102f5a-16ea-570b-8207-19ed4af0cbbd',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE tools/webhook-logger/delete/{id}', () => {
        return request(app.getHttpServer())
            .delete(
                '/tools/webhook-logger/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL toolsCreateWebhookLogger - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateWebhookLoggerInput!)
                    {
                        toolsCreateWebhookLogger (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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

    test('/GraphQL toolsPaginateWebhookLoggers', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateWebhookLoggers (query:$query constraint:$constraint)
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
                expect(res.body.data.toolsPaginateWebhookLoggers).toEqual({
                    total: webhookLoggerSeeder.collectionResponse.length,
                    count: webhookLoggerSeeder.collectionResponse.length,
                    rows: webhookLoggerSeeder.collectionResponse
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

    test('/GraphQL toolsGetWebhookLoggers', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetWebhookLoggers (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                ] of res.body.data.toolsGetWebhookLoggers.entries()) {
                    expect(
                        webhookLoggerSeeder.collectionResponse[index],
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

    test('/GraphQL toolsCreateWebhookLogger', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateWebhookLoggerInput!)
                    {
                        toolsCreateWebhookLogger (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                expect(res.body.data.toolsCreateWebhookLogger).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsFindWebhookLogger - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhookLogger (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: '93609d40-d86e-5e76-af4d-937e34980dac',
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

    test('/GraphQL toolsFindWebhookLogger', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhookLogger (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                expect(res.body.data.toolsFindWebhookLogger.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsFindWebhookLoggerById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookLoggerById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1ad8e3ec-d418-56c7-9720-e1bf407c183f',
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

    test('/GraphQL toolsFindWebhookLoggerById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookLoggerById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                    res.body.data.toolsFindWebhookLoggerById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsUpdateWebhookLoggerById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhookLoggerByIdInput!)
                    {
                        toolsUpdateWebhookLoggerById (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '8b4c0949-2d9a-5ced-8f76-7ee8436c7338',
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

    test('/GraphQL toolsUpdateWebhookLoggerById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhookLoggerByIdInput!)
                    {
                        toolsUpdateWebhookLoggerById (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                    res.body.data.toolsUpdateWebhookLoggerById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsUpdateWebhookLoggers', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhookLoggersInput! $query: QueryStatement)
                    {
                        toolsUpdateWebhookLoggers (payload:$payload query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                    res.body.data.toolsUpdateWebhookLoggers[0].id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsDeleteWebhookLoggerById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookLoggerById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '942e5504-e364-53aa-a8b1-62b7212d106b',
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

    test('/GraphQL toolsDeleteWebhookLoggerById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookLoggerById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
                    res.body.data.toolsDeleteWebhookLoggerById.id,
                ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () => {
        await webhookLoggerRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
