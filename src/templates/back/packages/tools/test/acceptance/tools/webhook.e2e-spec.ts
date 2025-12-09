/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import {
    ToolsIWebhookRepository,
    toolsMockWebhookData,
    ToolsMockWebhookSeeder,
} from '@app/tools/webhook';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('webhook', () => {
    let app: INestApplication;
    let webhookRepository: ToolsIWebhookRepository;
    let webhookSeeder: ToolsMockWebhookSeeder;

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
            providers: [ToolsMockWebhookSeeder],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = toolsMockWebhookData;
        app = module.createNestApplication();
        webhookRepository = module.get<ToolsIWebhookRepository>(
            ToolsIWebhookRepository,
        );
        webhookSeeder = module.get<ToolsMockWebhookSeeder>(
            ToolsMockWebhookSeeder,
        );

        // seed mock data in memory database
        await webhookRepository.insert(webhookSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookName property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookName must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookService property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                service: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookService must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookEndpoint property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                endpoint: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookEndpoint must be defined, can not be null',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookName property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookName must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookService property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                service: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookService must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookEndpoint property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                endpoint: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookEndpoint must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookName is too large, has a maximum length of 255', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookName is too large, has a maximum length of 255',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookService is too large, has a maximum length of 255', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                service:
                    '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookService is too large, has a maximum length of 255',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookEndpoint is too large, has a maximum length of 255', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                endpoint:
                    '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookEndpoint is too large, has a maximum length of 255',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookExternalId is too large, has a maximum length of 64', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                externalId:
                    '*****************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookExternalId is too large, has a maximum length of 64',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 400 Conflict, WebhookSecret is too large, has a maximum length of 128', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for ToolsWebhookSecret is too large, has a maximum length of 128',
                );
            });
    });

    test('/REST:POST tools/webhook/create - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST tools/webhooks/paginate', () => {
        return request(app.getHttpServer())
            .post('/tools/webhooks/paginate')
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
                    total: webhookSeeder.collectionResponse.length,
                    count: webhookSeeder.collectionResponse.length,
                    rows: webhookSeeder.collectionResponse
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

    test('/REST:POST tools/webhooks/get', () => {
        return request(app.getHttpServer())
            .post('/tools/webhooks/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    webhookSeeder.collectionResponse.map((item) =>
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

    test('/REST:POST tools/webhook/find - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: 'c01c1360-a212-50f5-9b4e-0c51471fe294',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST tools/webhook/create', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST tools/webhook/find', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/find')
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

    test('/REST:POST tools/webhook/find/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/find/76b02fac-aacf-5a67-a9b7-b684669cdcd4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST tools/webhook/find/{id}', () => {
        return request(app.getHttpServer())
            .post('/tools/webhook/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:PUT tools/webhook/update - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .put('/tools/webhook/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '98bddd16-3b11-5e72-b333-0cedf71a3dc3',
            })
            .expect(404);
    });

    test('/REST:PUT tools/webhook/update', () => {
        return request(app.getHttpServer())
            .put('/tools/webhook/update')
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

    test('/REST:DELETE tools/webhook/delete/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .delete(
                '/tools/webhook/delete/7765e755-3850-5098-97af-2abb76adc25b',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE tools/webhook/delete/{id}', () => {
        return request(app.getHttpServer())
            .delete(
                '/tools/webhook/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL toolsCreateWebhook - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateWebhookInput!)
                    {
                        toolsCreateWebhook (payload:$payload)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
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

    test('/GraphQL toolsPaginateWebhooks', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateWebhooks (query:$query constraint:$constraint)
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
                expect(res.body.data.toolsPaginateWebhooks).toEqual({
                    total: webhookSeeder.collectionResponse.length,
                    count: webhookSeeder.collectionResponse.length,
                    rows: webhookSeeder.collectionResponse
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

    test('/GraphQL toolsGetWebhooks', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetWebhooks (query:$query)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
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
                ] of res.body.data.toolsGetWebhooks.entries()) {
                    expect(webhookSeeder.collectionResponse[index]).toEqual(
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

    test('/GraphQL toolsCreateWebhook', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateWebhookInput!)
                    {
                        toolsCreateWebhook (payload:$payload)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
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
            .then((res) => {
                expect(res.body.data.toolsCreateWebhook).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsFindWebhook - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhook (query:$query)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: 'cec197a9-a0a2-547a-bfcd-b9c6c8de3dc8',
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

    test('/GraphQL toolsFindWebhook', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhook (query:$query)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
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
                expect(res.body.data.toolsFindWebhook.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsFindWebhookById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookById (id:$id)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'badfebd4-6979-5586-9142-f8eb35416299',
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

    test('/GraphQL toolsFindWebhookById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookById (id:$id)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
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
            .then((res) => {
                expect(res.body.data.toolsFindWebhookById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsUpdateWebhookById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhookByIdInput!)
                    {
                        toolsUpdateWebhookById (payload:$payload)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '37680954-7aaa-5564-addd-833c29e6c66c',
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

    test('/GraphQL toolsUpdateWebhookById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhookByIdInput!)
                    {
                        toolsUpdateWebhookById (payload:$payload)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
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
            .then((res) => {
                expect(res.body.data.toolsUpdateWebhookById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsUpdateWebhooks', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateWebhooksInput! $query: QueryStatement)
                    {
                        toolsUpdateWebhooks (payload:$payload query:$query)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
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
            .then((res) => {
                expect(res.body.data.toolsUpdateWebhooks[0].id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL toolsDeleteWebhookById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookById (id:$id)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a9485aaf-3559-571a-9582-ea7591f8e388',
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

    test('/GraphQL toolsDeleteWebhookById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookById (id:$id)
                        {
                            id
                            rowId
                            name
                            service
                            endpoint
                            externalId
                            events
                            secret
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
            .then((res) => {
                expect(res.body.data.toolsDeleteWebhookById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    afterAll(async () => {
        await webhookRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
