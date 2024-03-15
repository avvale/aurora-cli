/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { WhatsappModule } from '@api/whatsapp/whatsapp.module';
import { WhatsappIWebhookRepository, whatsappMockWebhookData, WhatsappMockWebhookSeeder } from '@app/whatsapp/webhook';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('webhook', () =>
{
    let app: INestApplication;
    let webhookRepository: WhatsappIWebhookRepository;
    let webhookSeeder: WhatsappMockWebhookSeeder;

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
                WhatsappMockWebhookSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = whatsappMockWebhookData;
        app = module.createNestApplication();
        webhookRepository = module.get<WhatsappIWebhookRepository>(WhatsappIWebhookRepository);
        webhookSeeder = module.get<WhatsappMockWebhookSeeder>(WhatsappMockWebhookSeeder);

        // seed mock data in memory database
        await webhookRepository.insert(webhookSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST whatsapp/webhook/create - Got 400 Conflict, WebhookId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappWebhookId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/webhook/create - Got 400 Conflict, WebhookPayload property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                payload: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappWebhookPayload must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/webhook/create - Got 400 Conflict, WebhookId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappWebhookId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/webhook/create - Got 400 Conflict, WebhookPayload property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                payload: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappWebhookPayload must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/webhook/create - Got 400 Conflict, WebhookId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappWebhookId is not allowed, must be a length of 36');
            });
    });


    test('/REST:POST whatsapp/webhook/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST whatsapp/webhooks/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhooks/paginate')
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
                    total: webhookSeeder.collectionResponse.length,
                    count: webhookSeeder.collectionResponse.length,
                    rows : webhookSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST whatsapp/webhooks/get', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhooks/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    webhookSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST whatsapp/webhook/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'dd43db4b-be73-5997-9453-754122d62131',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST whatsapp/webhook/create', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST whatsapp/webhook/find', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/find')
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

    test('/REST:POST whatsapp/webhook/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/find/3b8a55b7-433b-53e7-be70-f8c144c82f4d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST whatsapp/webhook/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/webhook/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT whatsapp/webhook/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/webhook/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'f652f175-d968-5cd6-a6c1-7fa10e0af890',
            })
            .expect(404);
    });

    test('/REST:PUT whatsapp/webhook/update', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/webhook/update')
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

    test('/REST:DELETE whatsapp/webhook/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/webhook/delete/2ff66854-39ed-5635-abf1-594571181656')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE whatsapp/webhook/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/webhook/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL whatsappCreateWebhook - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateWebhookInput!)
                    {
                        whatsappCreateWebhook (payload:$payload)
                        {
                            id
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

    test('/GraphQL whatsappPaginateWebhooks', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        whatsappPaginateWebhooks (query:$query constraint:$constraint)
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
                expect(res.body.data.whatsappPaginateWebhooks).toEqual({
                    total: webhookSeeder.collectionResponse.length,
                    count: webhookSeeder.collectionResponse.length,
                    rows : webhookSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL whatsappGetWebhooks', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappGetWebhooks (query:$query)
                        {
                            id
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
                for (const [index, value] of res.body.data.whatsappGetWebhooks.entries())
                {
                    expect(webhookSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL whatsappCreateWebhook', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateWebhookInput!)
                    {
                        whatsappCreateWebhook (payload:$payload)
                        {
                            id
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
                expect(res.body.data.whatsappCreateWebhook).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindWebhook - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindWebhook (query:$query)
                        {
                            id
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
                            id: '4cec416e-da73-59bb-b19c-66d7d8345e0e',
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

    test('/GraphQL whatsappFindWebhook', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindWebhook (query:$query)
                        {
                            id
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
                expect(res.body.data.whatsappFindWebhook.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindWebhookById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindWebhookById (id:$id)
                        {
                            id
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '12b7991e-7732-59f0-b2fd-500e555e7134',
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

    test('/GraphQL whatsappFindWebhookById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindWebhookById (id:$id)
                        {
                            id
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
                expect(res.body.data.whatsappFindWebhookById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateWebhookById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateWebhookByIdInput!)
                    {
                        whatsappUpdateWebhookById (payload:$payload)
                        {
                            id
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7b337e29-e7e5-5249-8ca7-9522ca7c47fd',
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

    test('/GraphQL whatsappUpdateWebhookById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateWebhookByIdInput!)
                    {
                        whatsappUpdateWebhookById (payload:$payload)
                        {
                            id
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
                expect(res.body.data.whatsappUpdateWebhookById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateWebhooks', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateWebhooksInput! $query: QueryStatement)
                    {
                        whatsappUpdateWebhooks (payload:$payload query:$query)
                        {
                            id
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
                expect(res.body.data.whatsappUpdateWebhooks[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappDeleteWebhookById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteWebhookById (id:$id)
                        {
                            id
                            payload
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5960b3db-4b0b-5e69-987d-e05853402693',
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

    test('/GraphQL whatsappDeleteWebhookById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteWebhookById (id:$id)
                        {
                            id
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
                expect(res.body.data.whatsappDeleteWebhookById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await webhookRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
