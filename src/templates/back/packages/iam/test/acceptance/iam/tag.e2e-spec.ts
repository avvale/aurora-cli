/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamModule } from '@api/iam/iam.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  IamITagRepository,
  iamMockTagData,
  IamMockTagSeeder,
} from '@app/iam/tag';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('tag', () => {
  let app: INestApplication;
  let tagRepository: IamITagRepository;
  let tagSeeder: IamMockTagSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        IamModule,
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
      providers: [IamMockTagSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = iamMockTagData;
    app = module.createNestApplication();
    tagRepository = module.get<IamITagRepository>(IamITagRepository);
    tagSeeder = module.get<IamMockTagSeeder>(IamMockTagSeeder);

    // seed mock data in memory database
    await tagRepository.insert(tagSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagName property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagName must be defined, can not be null',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagName property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagName must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 400 Conflict, TagName is too large, has a maximum length of 64', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '*****************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for IamTagName is too large, has a maximum length of 64',
        );
      });
  });

  test('/REST:POST iam/tag/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST iam/tags/paginate', () => {
    return request(app.getHttpServer())
      .post('/iam/tags/paginate')
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
          total: tagSeeder.collectionResponse.length,
          count: tagSeeder.collectionResponse.length,
          rows: tagSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST iam/tags/get', () => {
    return request(app.getHttpServer())
      .post('/iam/tags/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          tagSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST iam/tag/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: 'fda53530-d704-548e-91ac-2c87a3583693',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST iam/tag/create', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST iam/tag/find', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/find')
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

  test('/REST:POST iam/tag/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/find/f71ad715-6590-54ca-9d19-169c861b118f')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST iam/tag/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/iam/tag/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT iam/tag/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/iam/tag/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: 'aad6a5fd-1513-5499-b4c2-b04fa2bfe55a',
      })
      .expect(404);
  });

  test('/REST:PUT iam/tag/update', () => {
    return request(app.getHttpServer())
      .put('/iam/tag/update')
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

  test('/REST:DELETE iam/tag/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/iam/tag/delete/0dd5c9d4-6200-50a4-9df5-1ec1fd3bbc9f')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE iam/tag/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/iam/tag/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL iamCreateTag - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:IamCreateTagInput!)
                    {
                        iamCreateTag (payload:$payload)
                        {
                            id
                            rowId
                            name
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

  test('/GraphQL iamPaginateTags', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTags (query:$query constraint:$constraint)
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
        expect(res.body.data.iamPaginateTags).toEqual({
          total: tagSeeder.collectionResponse.length,
          count: tagSeeder.collectionResponse.length,
          rows: tagSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL iamGetTags', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTags (query:$query)
                        {
                            id
                            rowId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {},
      })
      .expect(200)
      .then((res) => {
        for (const [index, value] of res.body.data.iamGetTags.entries()) {
          expect(tagSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL iamCreateTag', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:IamCreateTagInput!)
                    {
                        iamCreateTag (payload:$payload)
                        {
                            id
                            rowId
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
      .then((res) => {
        expect(res.body.data.iamCreateTag).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL iamFindTag - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTag (query:$query)
                        {
                            id
                            rowId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: '8ef8c6fd-b647-54f7-ad07-0d76c7638c99',
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

  test('/GraphQL iamFindTag', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTag (query:$query)
                        {
                            id
                            rowId
                            name
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
        expect(res.body.data.iamFindTag.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL iamFindTagById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        iamFindTagById (id:$id)
                        {
                            id
                            rowId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'ccc917e8-ed4d-54ed-8a5e-6a209f512d76',
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

  test('/GraphQL iamFindTagById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        iamFindTagById (id:$id)
                        {
                            id
                            rowId
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
      .then((res) => {
        expect(res.body.data.iamFindTagById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL iamUpdateTagById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:IamUpdateTagByIdInput!)
                    {
                        iamUpdateTagById (payload:$payload)
                        {
                            id
                            rowId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: 'f55daf46-4432-554e-bc10-caafb2593b81',
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

  test('/GraphQL iamUpdateTagById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:IamUpdateTagByIdInput!)
                    {
                        iamUpdateTagById (payload:$payload)
                        {
                            id
                            rowId
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
      .then((res) => {
        expect(res.body.data.iamUpdateTagById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL iamUpdateTags', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:IamUpdateTagsInput! $query: QueryStatement)
                    {
                        iamUpdateTags (payload:$payload query:$query)
                        {
                            id
                            rowId
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
      .then((res) => {
        expect(res.body.data.iamUpdateTags[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL iamDeleteTagById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTagById (id:$id)
                        {
                            id
                            rowId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '4442f0ad-524d-59a3-ac92-454dd7064683',
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

  test('/GraphQL iamDeleteTagById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTagById (id:$id)
                        {
                            id
                            rowId
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
      .then((res) => {
        expect(res.body.data.iamDeleteTagById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await tagRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
