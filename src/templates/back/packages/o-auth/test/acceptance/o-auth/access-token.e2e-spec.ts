/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { OAuthModule } from '@api/o-auth/o-auth.module';
import {
  OAuthIAccessTokenRepository,
  oAuthMockAccessTokenData,
  OAuthMockAccessTokenSeeder,
} from '@app/o-auth/access-token';
import { Auth } from '@aurora/decorators';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('access-token', () => {
  let app: INestApplication;
  let accessTokenRepository: OAuthIAccessTokenRepository;
  let accessTokenSeeder: OAuthMockAccessTokenSeeder;

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
      providers: [OAuthMockAccessTokenSeeder],
    })
      .overrideGuard(Auth)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = oAuthMockAccessTokenData;
    app = module.createNestApplication();
    accessTokenRepository = module.get<OAuthIAccessTokenRepository>(
      OAuthIAccessTokenRepository,
    );
    accessTokenSeeder = module.get<OAuthMockAccessTokenSeeder>(
      OAuthMockAccessTokenSeeder,
    );

    // seed mock data in memory database
    await accessTokenRepository.insert(accessTokenSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        clientId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenClientId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenToken property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        token: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenToken must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenIsRevoked must be defined, can not be null',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        clientId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenClientId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenToken property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        token: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenToken must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenIsRevoked must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        clientId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenClientId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        accountId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenAccountId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 128', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '*********************************************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenName is too large, has a maximum length of 128',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isRevoked: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenIsRevoked has to be a boolean value',
        );
      });
  });
  test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        expiresAt: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for OAuthAccessTokenExpiresAt has to be a timestamp value',
        );
      });
  });

  test('/REST:POST o-auth/access-token/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST o-auth/access-tokens/paginate', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-tokens/paginate')
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
          total: accessTokenSeeder.collectionResponse.length,
          count: accessTokenSeeder.collectionResponse.length,
          rows: accessTokenSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST o-auth/access-tokens/get', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-tokens/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          accessTokenSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST o-auth/access-token/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '465ae5a1-4412-5b25-bf77-80ba61c77185',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST o-auth/access-token/create', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST o-auth/access-token/find', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/find')
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

  test('/REST:POST o-auth/access-token/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/find/1c506c08-2cb0-5fd9-acdd-cdc55979d3e2')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST o-auth/access-token/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/o-auth/access-token/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT o-auth/access-token/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/o-auth/access-token/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: 'faacb177-d61c-57ab-8400-377cd7d49c77',
      })
      .expect(404);
  });

  test('/REST:PUT o-auth/access-token/update', () => {
    return request(app.getHttpServer())
      .put('/o-auth/access-token/update')
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

  test('/REST:DELETE o-auth/access-token/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete(
        '/o-auth/access-token/delete/dc886cd5-3052-58b2-9b67-a5a04f4be696',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE o-auth/access-token/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete(
        '/o-auth/access-token/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
      )
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            rowId
                            clientId
                            accountId
                            token
                            name
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

  test('/GraphQL oAuthPaginateAccessTokens', () => {
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
        variables: {
          query: {
            offset: 0,
            limit: 5,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthPaginateAccessTokens).toEqual({
          total: accessTokenSeeder.collectionResponse.length,
          count: accessTokenSeeder.collectionResponse.length,
          rows: accessTokenSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL oAuthGetAccessTokens', () => {
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
                            rowId
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
      .then((res) => {
        for (const [
          index,
          value,
        ] of res.body.data.oAuthGetAccessTokens.entries()) {
          expect(accessTokenSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL oAuthCreateAccessToken', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            rowId
                            clientId
                            accountId
                            token
                            name
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
        expect(res.body.data.oAuthCreateAccessToken).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthFindAccessToken - Got 404 Not Found', () => {
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
                            rowId
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
          query: {
            where: {
              id: '255621b8-affb-5766-b44a-de72d6770b10',
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

  test('/GraphQL oAuthFindAccessToken', () => {
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
                            rowId
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
          query: {
            where: {
              id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            },
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthFindAccessTokenById - Got 404 Not Found', () => {
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
                            rowId
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
          id: '809bc848-09e0-5ffe-a957-dbee7083ddc2',
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

  test('/GraphQL oAuthFindAccessTokenById', () => {
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
                            rowId
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
          id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthUpdateAccessTokenById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateAccessTokenByIdInput!)
                    {
                        oAuthUpdateAccessTokenById (payload:$payload)
                        {
                            id
                            rowId
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
          payload: {
            ...mockData[0],
            id: '9734f751-bcf4-57e3-9d85-4d678842e9af',
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

  test('/GraphQL oAuthUpdateAccessTokenById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateAccessTokenByIdInput!)
                    {
                        oAuthUpdateAccessTokenById (payload:$payload)
                        {
                            id
                            rowId
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
          payload: {
            ...mockData[0],
            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthUpdateAccessTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthUpdateAccessTokens', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:OAuthUpdateAccessTokensInput! $query: QueryStatement)
                    {
                        oAuthUpdateAccessTokens (payload:$payload query:$query)
                        {
                            id
                            rowId
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
        expect(res.body.data.oAuthUpdateAccessTokens[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found', () => {
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
                            rowId
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
          id: '85f38240-629e-54a0-b928-4f1038ad1367',
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

  test('/GraphQL oAuthDeleteAccessTokenById', () => {
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
                            rowId
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
          id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await accessTokenRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
