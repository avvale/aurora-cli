/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  OAuthIRefreshTokenRepository,
  oAuthMockRefreshTokenData,
  OAuthMockRefreshTokenSeeder,
} from '@app/o-auth/refresh-token';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('refresh-token', () => {
  let app: INestApplication;
  let refreshTokenRepository: OAuthIRefreshTokenRepository;
  let refreshTokenSeeder: OAuthMockRefreshTokenSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        OAuthModule,
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
              password: configService.get('TEST_DATABASE_PASSWORD'),
              database: configService.get('TEST_DATABASE_SCHEMA'),
              synchronize: configService.get('TEST_DATABASE_SYNCHRONIZE'),
              logging:
                configService.get('TEST_DATABASE_LOGGIN') === 'true'
                  ? console.log
                  : false,
              autoLoadModels: true,
              models: [],
            };
          },
        }),
      ],
      providers: [OAuthMockRefreshTokenSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = oAuthMockRefreshTokenData;
    app = module.createNestApplication();
    refreshTokenRepository = module.get<OAuthIRefreshTokenRepository>(
      OAuthIRefreshTokenRepository,
    );
    refreshTokenSeeder = module.get<OAuthMockRefreshTokenSeeder>(
      OAuthMockRefreshTokenSeeder,
    );

    // seed mock data in memory database
    await refreshTokenRepository.insert(refreshTokenSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        accessTokenId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenAccessTokenId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        token: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenToken must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenIsRevoked must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        accessTokenId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenAccessTokenId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        token: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenToken must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenIsRevoked must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        accessTokenId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenAccessTokenId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenIsRevoked has to be a boolean value',
        );
      });
  });
  test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenExpiresAt has to be a timestamp value', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        expiresAt: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthRefreshTokenExpiresAt has to be a timestamp value',
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST o-auth/refresh-tokens/paginate', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-tokens/paginate')
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
          total: refreshTokenSeeder.collectionResponse.length,
          count: refreshTokenSeeder.collectionResponse.length,
          rows: refreshTokenSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST o-auth/refresh-tokens/get', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-tokens/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          refreshTokenSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST o-auth/refresh-token/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: 'aed27b98-9952-5fe5-9c81-cb4f06857983',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST o-auth/refresh-token/create', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST o-auth/refresh-token/find', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/find')
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

  test('/REST:POST o-auth/refresh-token/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/find/a4e47a70-6ab3-518d-a9be-992dcd442c21')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST o-auth/refresh-token/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/o-auth/refresh-token/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT o-auth/refresh-token/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/o-auth/refresh-token/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '07567a6f-1bbd-5334-820b-2cf10b0de335',
      })
      .expect(404);
  });

  test('/REST:PUT o-auth/refresh-token/update', () => {
    return request(app.getHttpServer())
      .put('/o-auth/refresh-token/update')
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

  test('/REST:DELETE o-auth/refresh-token/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete(
        '/o-auth/refresh-token/delete/813b1c20-c0a4-5a43-b276-e61bdf055b78',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE o-auth/refresh-token/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete(
        '/o-auth/refresh-token/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
      )
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            rowId
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                        }
                    }
                `,
        variables: {
          payload: _.omit(mockData[0], ['createdAt', 'updatedAt', 'deletedAt']),
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].extensions.originalError.statusCode).toBe(
          409,
        );
        expect(res.body.errors[0].extensions.originalError.message).toContain(
          'already exist in database',
        );
      });
  });

  test('/GraphQL oAuthPaginateRefreshTokens', () => {
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
        variables: {
          query: {
            offset: 0,
            limit: 5,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthPaginateRefreshTokens).toEqual({
          total: refreshTokenSeeder.collectionResponse.length,
          count: refreshTokenSeeder.collectionResponse.length,
          rows: refreshTokenSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL oAuthGetRefreshTokens', () => {
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
                            rowId
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
      .then((res) => {
        for (const [
          index,
          value,
        ] of res.body.data.oAuthGetRefreshTokens.entries()) {
          expect(refreshTokenSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL oAuthCreateRefreshToken', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            rowId
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
        expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthFindRefreshToken - Got 404 Not Found', () => {
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
                            rowId
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
          query: {
            where: {
              id: 'c55e7a55-2aa3-579c-b65e-35e07666231a',
            },
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].extensions.originalError.statusCode).toBe(
          404,
        );
        expect(res.body.errors[0].extensions.originalError.message).toContain(
          'not found',
        );
      });
  });

  test('/GraphQL oAuthFindRefreshToken', () => {
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
                            rowId
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
          query: {
            where: {
              id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            },
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found', () => {
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
                            rowId
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
          id: 'ca5373d7-fb53-5d72-ae70-b72dc26f555b',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].extensions.originalError.statusCode).toBe(
          404,
        );
        expect(res.body.errors[0].extensions.originalError.message).toContain(
          'not found',
        );
      });
  });

  test('/GraphQL oAuthFindRefreshTokenById', () => {
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
                            rowId
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
          id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthUpdateRefreshTokenById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateRefreshTokenByIdInput!)
                    {
                        oAuthUpdateRefreshTokenById (payload:$payload)
                        {
                            id
                            rowId
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
          payload: {
            ...mockData[0],
            id: 'fb23605c-5a51-558f-91a8-dc6d43c33f6e',
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].extensions.originalError.statusCode).toBe(
          404,
        );
        expect(res.body.errors[0].extensions.originalError.message).toContain(
          'not found',
        );
      });
  });

  test('/GraphQL oAuthUpdateRefreshTokenById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateRefreshTokenByIdInput!)
                    {
                        oAuthUpdateRefreshTokenById (payload:$payload)
                        {
                            id
                            rowId
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
          payload: {
            ...mockData[0],
            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthUpdateRefreshTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthUpdateRefreshTokens', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateRefreshTokensInput! $query: QueryStatement)
                    {
                        oAuthUpdateRefreshTokens (payload:$payload query:$query)
                        {
                            id
                            rowId
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
        expect(res.body.data.oAuthUpdateRefreshTokens[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found', () => {
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
                            rowId
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
          id: 'ba396686-1c67-58ce-954e-b242f7e04a34',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].extensions.originalError.statusCode).toBe(
          404,
        );
        expect(res.body.errors[0].extensions.originalError.message).toContain(
          'not found',
        );
      });
  });

  test('/GraphQL oAuthDeleteRefreshTokenById', () => {
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
                            rowId
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
          id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await refreshTokenRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
