/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  CommonIResourceRepository,
  commonMockResourceData,
  CommonMockResourceSeeder,
} from '@app/common/resource';
import { GraphQLConfigModule } from '@aurora/modules/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('resource', () => {
  let app: INestApplication;
  let resourceRepository: CommonIResourceRepository;
  let resourceSeeder: CommonMockResourceSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        CommonModule,
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
      providers: [CommonMockResourceSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = commonMockResourceData;
    app = module.createNestApplication();
    resourceRepository = module.get<CommonIResourceRepository>(
      CommonIResourceRepository,
    );
    resourceSeeder = module.get<CommonMockResourceSeeder>(
      CommonMockResourceSeeder,
    );

    // seed mock data in memory database
    await resourceRepository.insert(resourceSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceCode property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceCode must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceName property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceName must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceIsActive property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceIsActive must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceHasAttachments property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        hasAttachments: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceHasAttachments must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceCode property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceCode must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceName property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceName must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceIsActive property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceIsActive must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceHasAttachments property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        hasAttachments: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceHasAttachments must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceCode is too large, has a maximum length of 63', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: '****************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceCode is too large, has a maximum length of 63',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceName is too large, has a maximum length of 127', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '********************************************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceName is too large, has a maximum length of 127',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceIsActive has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceIsActive has to be a boolean value',
        );
      });
  });
  test('/REST:POST common/resource/create - Got 400 Conflict, ResourceHasAttachments has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        hasAttachments: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonResourceHasAttachments has to be a boolean value',
        );
      });
  });

  test('/REST:POST common/resource/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST common/resources/paginate', () => {
    return request(app.getHttpServer())
      .post('/common/resources/paginate')
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
          total: resourceSeeder.collectionResponse.length,
          count: resourceSeeder.collectionResponse.length,
          rows: resourceSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST common/resources/get', () => {
    return request(app.getHttpServer())
      .post('/common/resources/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          resourceSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST common/resource/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/common/resource/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '37007c3f-6cf1-536d-ac36-eb6f4e7d1017',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST common/resource/create', () => {
    return request(app.getHttpServer())
      .post('/common/resource/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST common/resource/find', () => {
    return request(app.getHttpServer())
      .post('/common/resource/find')
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

  test('/REST:POST common/resource/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/common/resource/find/ea22b1fa-5ed3-5972-8870-3baf7840a983')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST common/resource/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/common/resource/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT common/resource/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/common/resource/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '9a3e6e4e-b8cc-5f38-a480-3cc9d009a2e9',
      })
      .expect(404);
  });

  test('/REST:PUT common/resource/update', () => {
    return request(app.getHttpServer())
      .put('/common/resource/update')
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

  test('/REST:DELETE common/resource/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/common/resource/delete/20657aca-49a6-56ef-9d28-7ec000c54ab0')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE common/resource/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/common/resource/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL commonCreateResource - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateResourceInput!)
                    {
                        commonCreateResource (payload:$payload)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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

  test('/GraphQL commonPaginateResources', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateResources (query:$query constraint:$constraint)
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
        expect(res.body.data.commonPaginateResources).toEqual({
          total: resourceSeeder.collectionResponse.length,
          count: resourceSeeder.collectionResponse.length,
          rows: resourceSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL commonGetResources', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonGetResources (query:$query)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        ] of res.body.data.commonGetResources.entries()) {
          expect(resourceSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL commonCreateResource', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateResourceInput!)
                    {
                        commonCreateResource (payload:$payload)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonCreateResource).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonFindResource - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindResource (query:$query)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: '7cfac9b0-343e-5c2f-8157-718bfabfb334',
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

  test('/GraphQL commonFindResource', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindResource (query:$query)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonFindResource.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonFindResourceById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindResourceById (id:$id)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '230b2564-dabb-5ef1-8007-05395b7aedc0',
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

  test('/GraphQL commonFindResourceById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindResourceById (id:$id)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonFindResourceById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonUpdateResourceById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateResourceByIdInput!)
                    {
                        commonUpdateResourceById (payload:$payload)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: '0b8bc472-76bd-58d3-ba98-c6facf8abc07',
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

  test('/GraphQL commonUpdateResourceById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateResourceByIdInput!)
                    {
                        commonUpdateResourceById (payload:$payload)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonUpdateResourceById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonUpdateResources', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateResourcesInput! $query: QueryStatement)
                    {
                        commonUpdateResources (payload:$payload query:$query)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonUpdateResources[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonDeleteResourceById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteResourceById (id:$id)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'd9a42d00-4a2f-523a-a7f7-4d5496de8d1f',
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

  test('/GraphQL commonDeleteResourceById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteResourceById (id:$id)
                        {
                            id
                            code
                            name
                            isActive
                            hasAttachments
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
        expect(res.body.data.commonDeleteResourceById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await resourceRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
