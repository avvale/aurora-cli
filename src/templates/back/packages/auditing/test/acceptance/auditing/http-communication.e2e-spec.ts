/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IHttpCommunicationRepository } from '@app/auditing/http-communication/domain/http-communication.repository';
import { MockHttpCommunicationSeeder } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.seeder';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { AuditingModule } from '@api/auditing/auditing.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('http-communication', () =>
{
    let app: INestApplication;
    let httpCommunicationRepository: IHttpCommunicationRepository;
    let httpCommunicationSeeder: MockHttpCommunicationSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                AuditingModule,
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
                MockHttpCommunicationSeeder,
            ],
        })
            //.overrideGuard(AuthenticationGuard)
            //.useValue({ canActivate: () => true })
            //.overrideGuard(AuthorizationGuard)
            //.useValue({ canActivate: () => true })
            .compile();

        mockData = httpCommunications;
        app = module.createNestApplication();
        httpCommunicationRepository = module.get<IHttpCommunicationRepository>(IHttpCommunicationRepository);
        httpCommunicationSeeder = module.get<MockHttpCommunicationSeeder>(MockHttpCommunicationSeeder);

        // seed mock data in memory database
        await httpCommunicationRepository.insert(httpCommunicationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationId must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationEvent property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationEvent must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationMethod property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                method: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationMethod must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationUrl property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationUrl must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationEvent property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationEvent must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationMethod property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                method: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationMethod must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationUrl property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationUrl must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationCode is too large, has a maximum length of 100', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*****************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationCode is too large, has a maximum length of 100');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationStatus is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                status: 111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationStatus is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationMethod is too large, has a maximum length of 25', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                method: '**************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationMethod is too large, has a maximum length of 25');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationUrl is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: '*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationUrl is too large, has a maximum length of 2048');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 400 Conflict, HttpCommunicationEvent has to be a enum option of REQUEST_FULFILLED, REQUEST_REJECTED, RESPONSE_FULFILLED, RESPONSE_REJECTED', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for HttpCommunicationEvent has to be any of this options: REQUEST_FULFILLED, REQUEST_REJECTED, RESPONSE_FULFILLED, RESPONSE_REJECTED');
            });
    });

    test('/REST:POST auditing/http-communication/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST auditing/http-communications/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communications/paginate')
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
                    total: httpCommunicationSeeder.collectionResponse.length,
                    count: httpCommunicationSeeder.collectionResponse.length,
                    rows : httpCommunicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST auditing/http-communications/get', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communications/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    httpCommunicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST auditing/http-communication/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '547b5b39-c313-573b-be88-af97367c21a1',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST auditing/http-communication/create', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST auditing/http-communication/find', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/find')
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

    test('/REST:POST auditing/http-communication/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/find/ce619700-b01f-580b-987f-270c026b447d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST auditing/http-communication/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/http-communication/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT auditing/http-communication/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/auditing/http-communication/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '54654dc7-d9bd-50c1-99a5-904ca358727b',
            })
            .expect(404);
    });

    test('/REST:PUT auditing/http-communication/update', () =>
    {
        return request(app.getHttpServer())
            .put('/auditing/http-communication/update')
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

    test('/REST:DELETE auditing/http-communication/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/auditing/http-communication/delete/3c015ae8-e4eb-5440-bb2a-f2a59364681d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE auditing/http-communication/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/auditing/http-communication/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL auditingCreateHttpCommunication - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingCreateHttpCommunicationInput!)
                    {
                        auditingCreateHttpCommunication (payload:$payload)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL auditingPaginateHttpCommunications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        auditingPaginateHttpCommunications (query:$query constraint:$constraint)
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
                expect(res.body.data.auditingPaginateHttpCommunications).toEqual({
                    total: httpCommunicationSeeder.collectionResponse.length,
                    count: httpCommunicationSeeder.collectionResponse.length,
                    rows : httpCommunicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL auditingGetHttpCommunications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingGetHttpCommunications (query:$query)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                for (const [index, value] of res.body.data.auditingGetHttpCommunications.entries())
                {
                    expect(httpCommunicationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL auditingCreateHttpCommunication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingCreateHttpCommunicationInput!)
                    {
                        auditingCreateHttpCommunication (payload:$payload)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingCreateHttpCommunication).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingFindHttpCommunication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingFindHttpCommunication (query:$query)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                            id: 'ac37af93-a492-5eae-83c1-26f3fd99fb2f',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL auditingFindHttpCommunication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingFindHttpCommunication (query:$query)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingFindHttpCommunication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingFindHttpCommunicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        auditingFindHttpCommunicationById (id:$id)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '66b8e399-f364-5cc1-b5bd-feb4c969692c',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL auditingFindHttpCommunicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        auditingFindHttpCommunicationById (id:$id)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingFindHttpCommunicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingUpdateHttpCommunicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateHttpCommunicationByIdInput!)
                    {
                        auditingUpdateHttpCommunicationById (payload:$payload)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5a7afaa6-dd43-56d6-b185-98febac81fb9',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL auditingUpdateHttpCommunicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateHttpCommunicationByIdInput!)
                    {
                        auditingUpdateHttpCommunicationById (payload:$payload)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingUpdateHttpCommunicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingUpdateHttpCommunications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateHttpCommunicationsInput! $query: QueryStatement)
                    {
                        auditingUpdateHttpCommunications (payload:$payload query:$query)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingUpdateHttpCommunications[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingDeleteHttpCommunicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        auditingDeleteHttpCommunicationById (id:$id)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '715aa5a4-69ae-5f06-ac49-77b59395fa96',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL auditingDeleteHttpCommunicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        auditingDeleteHttpCommunicationById (id:$id)
                        {
                            id
                            code
                            event
                            status
                            method
                            url
                            httpRequest
                            httpRequestRejected
                            httpResponse
                            httpResponseRejected
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
                expect(res.body.data.auditingDeleteHttpCommunicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await httpCommunicationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});