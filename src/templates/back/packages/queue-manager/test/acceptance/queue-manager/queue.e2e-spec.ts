/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { QueueManagerModule } from '@api/queue-manager/queue-manager.module';
import { QueueManagerIQueueRepository, queueManagerMockQueueData, QueueManagerMockQueueSeeder } from '@app/queue-manager/queue';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('queue', () =>
{
    let app: INestApplication;
    let queueRepository: QueueManagerIQueueRepository;
    let queueSeeder: QueueManagerMockQueueSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                QueueManagerModule,
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
                QueueManagerMockQueueSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = queueManagerMockQueueData;
        app = module.createNestApplication();
        queueRepository = module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
        queueSeeder = module.get<QueueManagerMockQueueSeeder>(QueueManagerMockQueueSeeder);

        // seed mock data in memory database
        await queueRepository.insert(queueSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueId must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueuePrefix property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                prefix: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueuePrefix must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueName must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueId must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueuePrefix property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                prefix: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueuePrefix must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueName must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueuePrefix is too large, has a maximum length of 63', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                prefix: '****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueuePrefix is too large, has a maximum length of 63');
            });
    });

    test('/REST:POST queue-manager/queue/create - Got 400 Conflict, QueueName is too large, has a maximum length of 63', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerQueueName is too large, has a maximum length of 63');
            });
    });


    test('/REST:POST queue-manager/queue/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST queue-manager/queues/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queues/paginate')
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
                    total: queueSeeder.collectionResponse.length,
                    count: queueSeeder.collectionResponse.length,
                    rows : queueSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST queue-manager/queues/get', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queues/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    queueSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST queue-manager/queue/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '68b918c5-52c5-5138-bda4-d9c6e82df62a',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST queue-manager/queue/create', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST queue-manager/queue/find', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/find')
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

    test('/REST:POST queue-manager/queue/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/find/3f7793a5-41bc-5154-ac67-221445c98d99')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST queue-manager/queue/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/queue/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT queue-manager/queue/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/queue-manager/queue/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'ce38dfc9-2ca2-5081-9be4-a5978214cf3d',
            })
            .expect(404);
    });

    test('/REST:PUT queue-manager/queue/update', () =>
    {
        return request(app.getHttpServer())
            .put('/queue-manager/queue/update')
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

    test('/REST:DELETE queue-manager/queue/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/queue-manager/queue/delete/1e92e502-8af7-5872-ab06-2baedc8b6250')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE queue-manager/queue/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/queue-manager/queue/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL queueManagerCreateQueue - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerCreateQueueInput!)
                    {
                        queueManagerCreateQueue (payload:$payload)
                        {
                            id
                            prefix
                            name
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

    test('/GraphQL queueManagerPaginateQueues', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        queueManagerPaginateQueues (query:$query constraint:$constraint)
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
                expect(res.body.data.queueManagerPaginateQueues).toEqual({
                    total: queueSeeder.collectionResponse.length,
                    count: queueSeeder.collectionResponse.length,
                    rows : queueSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL queueManagerGetQueues', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerGetQueues (query:$query)
                        {
                            id
                            prefix
                            name
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
                for (const [index, value] of res.body.data.queueManagerGetQueues.entries())
                {
                    expect(queueSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL queueManagerCreateQueue', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerCreateQueueInput!)
                    {
                        queueManagerCreateQueue (payload:$payload)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerCreateQueue).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerFindQueue - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerFindQueue (query:$query)
                        {
                            id
                            prefix
                            name
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
                            id: 'da8ecf74-51f6-5f73-8e5c-2cc12f0bb38c',
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

    test('/GraphQL queueManagerFindQueue', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerFindQueue (query:$query)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerFindQueue.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerFindQueueById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        queueManagerFindQueueById (id:$id)
                        {
                            id
                            prefix
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5d8cae8f-5f02-516b-beb4-44ca60bd3f50',
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

    test('/GraphQL queueManagerFindQueueById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        queueManagerFindQueueById (id:$id)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerFindQueueById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerUpdateQueueById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateQueueByIdInput!)
                    {
                        queueManagerUpdateQueueById (payload:$payload)
                        {
                            id
                            prefix
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '4fe17240-c74e-57db-b73d-db9c5227d6a4',
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

    test('/GraphQL queueManagerUpdateQueueById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateQueueByIdInput!)
                    {
                        queueManagerUpdateQueueById (payload:$payload)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerUpdateQueueById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerUpdateQueues', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateQueuesInput! $query: QueryStatement)
                    {
                        queueManagerUpdateQueues (payload:$payload query:$query)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerUpdateQueues[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerDeleteQueueById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        queueManagerDeleteQueueById (id:$id)
                        {
                            id
                            prefix
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a9fecddd-0d8f-5ab7-a6bf-3ee64049390a',
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

    test('/GraphQL queueManagerDeleteQueueById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        queueManagerDeleteQueueById (id:$id)
                        {
                            id
                            prefix
                            name
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
                expect(res.body.data.queueManagerDeleteQueueById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await queueRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
