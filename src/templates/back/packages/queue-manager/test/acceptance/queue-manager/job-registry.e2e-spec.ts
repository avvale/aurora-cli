/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { QueueManagerModule } from '@api/queue-manager/queue-manager.module';
import { QueueManagerIJobRegistryRepository, queueManagerMockJobRegistryData, QueueManagerMockJobRegistrySeeder } from '@app/queue-manager/job-registry';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('job-registry', () =>
{
    let app: INestApplication;
    let jobRegistryRepository: QueueManagerIJobRegistryRepository;
    let jobRegistrySeeder: QueueManagerMockJobRegistrySeeder;

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
                QueueManagerMockJobRegistrySeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = queueManagerMockJobRegistryData;
        app = module.createNestApplication();
        jobRegistryRepository = module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        jobRegistrySeeder = module.get<QueueManagerMockJobRegistrySeeder>(QueueManagerMockJobRegistrySeeder);

        // seed mock data in memory database
        await jobRegistryRepository.insert(jobRegistrySeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryId must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryQueueName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                queueName: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryQueueName must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryState property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                state: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryState must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryJobId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                jobId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryJobId must be defined, can not be null');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryQueueName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                queueName: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryQueueName must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryState property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                state: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryState must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryJobId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                jobId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryJobId must be defined, can not be undefined');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryQueueName is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                queueName: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryQueueName is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryJobId is too large, has a maximum length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                jobId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryJobId is too large, has a maximum length of 36');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryJobName is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                jobName: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryJobName is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 400 Conflict, JobRegistryState has to be a enum option of COMPLETED, WAITING, ACTIVE, DELAYED, FAILED, PAUSED', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                state: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for QueueManagerJobRegistryState has to be any of this options: COMPLETED, WAITING, ACTIVE, DELAYED, FAILED, PAUSED');
            });
    });

    test('/REST:POST queue-manager/job-registry/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST queue-manager/jobs-registry/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/jobs-registry/paginate')
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
                    total: jobRegistrySeeder.collectionResponse.length,
                    count: jobRegistrySeeder.collectionResponse.length,
                    rows : jobRegistrySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST queue-manager/jobs-registry/get', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/jobs-registry/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    jobRegistrySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST queue-manager/job-registry/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'bb39f787-f4a1-562a-b358-1b8199c36c8e',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST queue-manager/job-registry/create', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST queue-manager/job-registry/find', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/find')
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

    test('/REST:POST queue-manager/job-registry/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/find/981e7c51-8065-5240-81e7-b374014519a9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST queue-manager/job-registry/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/queue-manager/job-registry/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT queue-manager/job-registry/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/queue-manager/job-registry/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5a19ed93-d5bb-5649-b8b7-5b40ebc4dd7c',
            })
            .expect(404);
    });

    test('/REST:PUT queue-manager/job-registry/update', () =>
    {
        return request(app.getHttpServer())
            .put('/queue-manager/job-registry/update')
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

    test('/REST:DELETE queue-manager/job-registry/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/queue-manager/job-registry/delete/c132a7a7-fa6f-5c8f-a1b3-f9ea8954492f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE queue-manager/job-registry/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/queue-manager/job-registry/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL queueManagerCreateJobRegistry - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerCreateJobRegistryInput!)
                    {
                        queueManagerCreateJobRegistry (payload:$payload)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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

    test('/GraphQL queueManagerPaginateJobsRegistry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        queueManagerPaginateJobsRegistry (query:$query constraint:$constraint)
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
                expect(res.body.data.queueManagerPaginateJobsRegistry).toEqual({
                    total: jobRegistrySeeder.collectionResponse.length,
                    count: jobRegistrySeeder.collectionResponse.length,
                    rows : jobRegistrySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL queueManagerGetJobsRegistry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerGetJobsRegistry (query:$query)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                for (const [index, value] of res.body.data.queueManagerGetJobsRegistry.entries())
                {
                    expect(jobRegistrySeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL queueManagerCreateJobRegistry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerCreateJobRegistryInput!)
                    {
                        queueManagerCreateJobRegistry (payload:$payload)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerCreateJobRegistry).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerFindJobRegistry - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerFindJobRegistry (query:$query)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                            id: '94f85acd-7518-5786-97f4-9185aa2f3e88',
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

    test('/GraphQL queueManagerFindJobRegistry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        queueManagerFindJobRegistry (query:$query)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerFindJobRegistry.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerFindJobRegistryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        queueManagerFindJobRegistryById (id:$id)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6c8d771e-144c-589b-8140-638751c397a2',
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

    test('/GraphQL queueManagerFindJobRegistryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        queueManagerFindJobRegistryById (id:$id)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerFindJobRegistryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerUpdateJobRegistryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateJobRegistryByIdInput!)
                    {
                        queueManagerUpdateJobRegistryById (payload:$payload)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '41434c32-1029-50d1-bebe-d72a54cc1216',
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

    test('/GraphQL queueManagerUpdateJobRegistryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateJobRegistryByIdInput!)
                    {
                        queueManagerUpdateJobRegistryById (payload:$payload)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerUpdateJobRegistryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerUpdateJobsRegistry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:QueueManagerUpdateJobsRegistryInput! $query: QueryStatement)
                    {
                        queueManagerUpdateJobsRegistry (payload:$payload query:$query)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerUpdateJobsRegistry[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL queueManagerDeleteJobRegistryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        queueManagerDeleteJobRegistryById (id:$id)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5d714bf6-a6d9-5012-8a36-96762dbe3758',
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

    test('/GraphQL queueManagerDeleteJobRegistryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        queueManagerDeleteJobRegistryById (id:$id)
                        {
                            id
                            queueName
                            state
                            jobId
                            jobName
                            tags
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
                expect(res.body.data.queueManagerDeleteJobRegistryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await jobRegistryRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
