/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@apps/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenSeeder } from '@apps/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let accessTokenRepository: IAccessTokenRepository;
    let accessTokenSeeder: MockAccessTokenSeeder;

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
                MockAccessTokenSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = accessTokens;
        app = module.createNestApplication();
        accessTokenRepository = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        accessTokenSeeder = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);

        // seed mock data in memory database
        await accessTokenRepository.insert(accessTokenSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/access-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/paginate')
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
                    total: accessTokenSeeder.collectionResponse.length,
                    count: accessTokenSeeder.collectionResponse.length,
                    rows : accessTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthPaginateAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens).toEqual({
                    total: accessTokenSeeder.collectionResponse.length,
                    count: accessTokenSeeder.collectionResponse.length,
                    rows : accessTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/access-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    accessTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/GraphQL oAuthGetAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(accessTokenSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/REST:POST o-auth/access-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '6282fc20-1f44-4f79-871a-38c4ceca1ba4',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/access-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c2bdb79b-033e-4751-a740-a989e8e580fc',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/REST:GET o-auth/access-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/753a1eb6-41da-4455-a1d7-c2fd083572b1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/access-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/c2bdb79b-033e-4751-a740-a989e8e580fc')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/REST:DELETE o-auth/access-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/33bf0f72-e3de-4948-880c-b02d3815987f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/access-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/c2bdb79b-033e-4751-a740-a989e8e580fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthFindAccessToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '14a8bdbe-9295-4c95-b3d4-dc84e319a512',
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

    test('/GraphQL oAuthFindAccessToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '86d096bf-7fbb-41e3-971d-207a7b4d232f',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('86d096bf-7fbb-41e3-971d-207a7b4d232f');
            });
    });

    test('/GraphQL oAuthFindAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '55fa3020-fa08-44c7-8b4b-dda8f67b8cd7',
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

    test('/GraphQL oAuthFindAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86d096bf-7fbb-41e3-971d-207a7b4d232f',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('86d096bf-7fbb-41e3-971d-207a7b4d232f');
            });
    });

    test('/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5eff2ece-b4f6-4ec2-8c64-c4aa05bf3cf1',
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

    test('/GraphQL oAuthDeleteAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86d096bf-7fbb-41e3-971d-207a7b4d232f',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('86d096bf-7fbb-41e3-971d-207a7b4d232f');
            });
    });

    afterAll(async () =>
    {
        await accessTokenRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});