/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '@app/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenSeeder } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.seeder';
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('refresh-token', () =>
{
    let app: INestApplication;
    let refreshTokenRepository: IRefreshTokenRepository;
    let refreshTokenSeeder: MockRefreshTokenSeeder;

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
                MockRefreshTokenSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = refreshTokens;
        app = module.createNestApplication();
        refreshTokenRepository = module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        refreshTokenSeeder = module.get<MockRefreshTokenSeeder>(MockRefreshTokenSeeder);

        // seed mock data in memory database
        await refreshTokenRepository.insert(refreshTokenSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/refresh-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/paginate')
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
                    total: refreshTokenSeeder.collectionResponse.length,
                    count: refreshTokenSeeder.collectionResponse.length,
                    rows : refreshTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthPaginateRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateRefreshTokens).toEqual({
                    total: refreshTokenSeeder.collectionResponse.length,
                    count: refreshTokenSeeder.collectionResponse.length,
                    rows : refreshTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/refresh-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    refreshTokenSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/refresh-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '761ab78e-fdf6-4a55-b881-7d456004695b',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/refresh-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'f710edae-c011-4b7d-acfa-65cead5771cd',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'f710edae-c011-4b7d-acfa-65cead5771cd');
            });
    });

    test('/REST:POST o-auth/refresh-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find/8dac8857-8dc5-4c00-9d98-e1fce0ccf090')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST o-auth/refresh-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find/f710edae-c011-4b7d-acfa-65cead5771cd')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'f710edae-c011-4b7d-acfa-65cead5771cd');
            });
    });

    test('/REST:DELETE o-auth/refresh-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/6a866d68-3c33-460c-9a0f-15c8f7a1c860')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/refresh-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/f710edae-c011-4b7d-acfa-65cead5771cd')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthGetRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetRefreshTokens (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                for (const [index, value] of res.body.data.oAuthGetRefreshTokens.entries())
                {
                    expect(refreshTokenSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthFindRefreshToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                            id: '8e673ef7-29d7-44d5-8e1b-10692651602a',
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

    test('/GraphQL oAuthFindRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                            id: '527ebfe3-e017-4831-aeaa-c8e9a4018161',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('527ebfe3-e017-4831-aeaa-c8e9a4018161');
            });
    });

    test('/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '24959ee0-a71f-43cb-90bb-aa970bd58808',
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

    test('/GraphQL oAuthFindRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '527ebfe3-e017-4831-aeaa-c8e9a4018161',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('527ebfe3-e017-4831-aeaa-c8e9a4018161');
            });
    });

    test('/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a3cd333d-74c5-4d1c-9fdf-d57cdd136f55',
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

    test('/GraphQL oAuthDeleteRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '527ebfe3-e017-4831-aeaa-c8e9a4018161',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('527ebfe3-e017-4831-aeaa-c8e9a4018161');
            });
    });

    afterAll(async () =>
    {
        await refreshTokenRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});