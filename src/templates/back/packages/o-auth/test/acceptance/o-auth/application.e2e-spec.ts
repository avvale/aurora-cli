/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { OAuthIApplicationRepository, oAuthMockApplicationData, OAuthMockApplicationSeeder } from '@app/o-auth/application';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let applicationRepository: OAuthIApplicationRepository;
    let applicationSeeder: OAuthMockApplicationSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
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
                OAuthMockApplicationSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = oAuthMockApplicationData;
        app = module.createNestApplication();
        applicationRepository = module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
        applicationSeeder = module.get<OAuthMockApplicationSeeder>(OAuthMockApplicationSeeder);

        // seed mock data in memory database
        await applicationRepository.insert(applicationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationCode must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationName must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationSecret must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationIsMaster must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationCode must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationName must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationSecret must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationCode is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationName is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationSecret is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for OAuthApplicationIsMaster has to be a boolean value');
            });
    });

    test('/REST:POST o-auth/application/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/applications/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/applications/paginate')
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
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/applications/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/applications/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))),
                );
            });
    });

    test('/REST:POST o-auth/application/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'a430a95c-b13b-500d-82be-37a52aaf54bd',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/application/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST o-auth/application/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find')
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

    test('/REST:POST o-auth/application/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find/a667176e-6937-5bf2-9ab3-58ec2e5d5cbf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST o-auth/application/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/application/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'cd62f750-693a-564d-b529-0bbf6ca414cc',
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/application/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application/update')
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

    test('/REST:DELETE o-auth/application/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/delete/a769d002-3f18-5ceb-b62b-acd9963a2686')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/application/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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

    test('/GraphQL oAuthPaginateApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications).toEqual({
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(applicationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindApplication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                            id: '9a2a8b30-c363-5c80-bb14-2b2e0058eefa',
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

    test('/GraphQL oAuthFindApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '897a41f9-dd52-5912-b120-2ea1c5d493f8',
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

    test('/GraphQL oAuthFindApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationByIdInput!)
                    {
                        oAuthUpdateApplicationById (payload:$payload)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'a8896596-7c80-53c2-86e3-0253530df0e9',
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

    test('/GraphQL oAuthUpdateApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationByIdInput!)
                    {
                        oAuthUpdateApplicationById (payload:$payload)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthUpdateApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationsInput! $query: QueryStatement)
                    {
                        oAuthUpdateApplications (payload:$payload query:$query)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthUpdateApplications[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '93430a16-a49a-567f-b692-b967951622cd',
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

    test('/GraphQL oAuthDeleteApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            code
                            name
                            secret
                            isMaster
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
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
