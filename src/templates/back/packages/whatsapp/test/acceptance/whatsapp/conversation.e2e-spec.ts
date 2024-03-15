/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { WhatsappModule } from '@api/whatsapp/whatsapp.module';
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationSeeder } from '@app/whatsapp/conversation';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('conversation', () =>
{
    let app: INestApplication;
    let conversationRepository: WhatsappIConversationRepository;
    let conversationSeeder: WhatsappMockConversationSeeder;

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
                WhatsappMockConversationSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = whatsappMockConversationData;
        app = module.createNestApplication();
        conversationRepository = module.get<WhatsappIConversationRepository>(WhatsappIConversationRepository);
        conversationSeeder = module.get<WhatsappMockConversationSeeder>(WhatsappMockConversationSeeder);

        // seed mock data in memory database
        await conversationRepository.insert(conversationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST whatsapp/conversation/create - Got 400 Conflict, ConversationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappConversationId must be defined, can not be null');
            });
    });

    test('/REST:POST whatsapp/conversation/create - Got 400 Conflict, ConversationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappConversationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST whatsapp/conversation/create - Got 400 Conflict, ConversationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for WhatsappConversationId is not allowed, must be a length of 36');
            });
    });


    test('/REST:POST whatsapp/conversation/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST whatsapp/conversations/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversations/paginate')
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
                    total: conversationSeeder.collectionResponse.length,
                    count: conversationSeeder.collectionResponse.length,
                    rows : conversationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST whatsapp/conversations/get', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversations/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    conversationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST whatsapp/conversation/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'a26dd040-1a97-5455-a10d-f9ccd13fb2ca',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST whatsapp/conversation/create', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST whatsapp/conversation/find', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/find')
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

    test('/REST:POST whatsapp/conversation/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/find/7e9f46e7-1c5d-5cc8-94cb-fbef1b95e624')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST whatsapp/conversation/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/whatsapp/conversation/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT whatsapp/conversation/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/conversation/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'dfb9f8d3-4545-5f19-8446-1ab51c872825',
            })
            .expect(404);
    });

    test('/REST:PUT whatsapp/conversation/update', () =>
    {
        return request(app.getHttpServer())
            .put('/whatsapp/conversation/update')
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

    test('/REST:DELETE whatsapp/conversation/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/conversation/delete/18c93868-566e-5453-a105-bf7b82a291dd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE whatsapp/conversation/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/whatsapp/conversation/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL whatsappCreateConversation - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateConversationInput!)
                    {
                        whatsappCreateConversation (payload:$payload)
                        {
                            id
                            accounts
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

    test('/GraphQL whatsappPaginateConversations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        whatsappPaginateConversations (query:$query constraint:$constraint)
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
                expect(res.body.data.whatsappPaginateConversations).toEqual({
                    total: conversationSeeder.collectionResponse.length,
                    count: conversationSeeder.collectionResponse.length,
                    rows : conversationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL whatsappGetConversations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappGetConversations (query:$query)
                        {
                            id
                            accounts
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
                for (const [index, value] of res.body.data.whatsappGetConversations.entries())
                {
                    expect(conversationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL whatsappCreateConversation', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappCreateConversationInput!)
                    {
                        whatsappCreateConversation (payload:$payload)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappCreateConversation).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindConversation - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindConversation (query:$query)
                        {
                            id
                            accounts
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
                            id: 'ff31f835-54e2-5951-95b1-3a8ad5b114f1',
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

    test('/GraphQL whatsappFindConversation', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindConversation (query:$query)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappFindConversation.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappFindConversationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindConversationById (id:$id)
                        {
                            id
                            accounts
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ddad53fc-a50e-5f46-8705-72c3d94d2c68',
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

    test('/GraphQL whatsappFindConversationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        whatsappFindConversationById (id:$id)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappFindConversationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateConversationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateConversationByIdInput!)
                    {
                        whatsappUpdateConversationById (payload:$payload)
                        {
                            id
                            accounts
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '883e7ead-a9ff-5f56-a7cd-06eb236ceda2',
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

    test('/GraphQL whatsappUpdateConversationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateConversationByIdInput!)
                    {
                        whatsappUpdateConversationById (payload:$payload)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappUpdateConversationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappUpdateConversations', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:WhatsappUpdateConversationsInput! $query: QueryStatement)
                    {
                        whatsappUpdateConversations (payload:$payload query:$query)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappUpdateConversations[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL whatsappDeleteConversationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteConversationById (id:$id)
                        {
                            id
                            accounts
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ecec726c-5b9d-59ee-9bf3-106ca4a3f002',
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

    test('/GraphQL whatsappDeleteConversationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteConversationById (id:$id)
                        {
                            id
                            accounts
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
                expect(res.body.data.whatsappDeleteConversationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await conversationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
