/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@apps/o-auth/client/domain/client.repository';
import { MockClientSeeder } from '@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { clients } from '@apps/o-auth/client/infrastructure/seeds/client.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let clientRepository: IClientRepository;
    let clientSeeder: MockClientSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 15s by default are 5s
    jest.setTimeout(15000);

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
                MockClientSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = clients;
        app = module.createNestApplication();
        clientRepository = module.get<IClientRepository>(IClientRepository);
        clientSeeder = module.get<MockClientSeeder>(MockClientSeeder);

        // seed mock data in memory database
        await clientRepository.insert(clientSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                grantType: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                grantType: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: '*******************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                authUrl: '*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                redirect: '*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                expiredAccessToken: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                expiredRefreshToken: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                expiredAccessToken: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                expiredRefreshToken: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                grantType: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });

    test('/REST:POST o-auth/client/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/clients/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/clients/paginate')
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
                    total: clientSeeder.collectionResponse.length,
                    count: clientSeeder.collectionResponse.length,
                    rows : clientSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/clients/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/clients/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    clientSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))),
                );
            });
    });

    test('/REST:POST o-auth/client/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '56c6feb2-67df-4b9c-bed4-f4891e652abc',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/client/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST o-auth/client/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/find')
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

    test('/REST:GET o-auth/client/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/find/bf74129a-3a38-45b6-a672-4507e5e9e9e3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/client/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/client/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'b27d81a5-c8a3-4b2a-8cf3-fe0d164ca1bd',
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/client/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client/update')
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

    test('/REST:DELETE o-auth/client/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/delete/00ece5da-e41f-4131-be7f-e0ef2e072803')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/client/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['applications', 'createdAt','updatedAt','deletedAt']),
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

    test('/GraphQL oAuthPaginateClients', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients).toEqual({
                    total: clientSeeder.collectionResponse.length,
                    count: clientSeeder.collectionResponse.length,
                    rows : clientSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetClients', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(clientSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateClient', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        ..._.omit(mockData[0], ['applications', 'createdAt','updatedAt','deletedAt']),
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindClient - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '05b53fa4-9aaa-4714-b549-88e008dd9bac',
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

    test('/GraphQL oAuthFindClient', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindClientById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5551df0f-be74-46ad-9479-c7ffde1c4c12',
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

    test('/GraphQL oAuthFindClientById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateClientById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientByIdInput!)
                    {
                        oAuthUpdateClientById (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ..._.omit(mockData[0], ['applications', 'createdAt','updatedAt','deletedAt']),
                        id: '11390578-6994-491b-952a-59ab477a644c',
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

    test('/GraphQL oAuthUpdateClientById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientByIdInput!)
                    {
                        oAuthUpdateClientById (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ..._.omit(mockData[0], ['applications', 'createdAt','updatedAt','deletedAt']),
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateClientById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateClients', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientsInput! $query: QueryStatement)
                    {
                        oAuthUpdateClients (payload:$payload query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ..._.omit(mockData[0], ['applications', 'createdAt','updatedAt','deletedAt']),
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
                expect(res.body.data.oAuthUpdateClients[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteClientById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be896f2b-513d-4a7a-9190-90ed514f1ab8',
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

    test('/GraphQL oAuthDeleteClientById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            scopes
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await clientRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});