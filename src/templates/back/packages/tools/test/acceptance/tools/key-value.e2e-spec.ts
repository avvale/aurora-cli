/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import {
  ToolsIKeyValueRepository,
  toolsMockKeyValueData,
  ToolsMockKeyValueSeeder,
} from '@app/tools/key-value';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('key-value', () => {
  let app: INestApplication;
  let keyValueRepository: ToolsIKeyValueRepository;
  let keyValueSeeder: ToolsMockKeyValueSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        ToolsModule,
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
      providers: [ToolsMockKeyValueSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = toolsMockKeyValueData;
    app = module.createNestApplication();
    keyValueRepository = module.get<ToolsIKeyValueRepository>(
      ToolsIKeyValueRepository,
    );
    keyValueSeeder = module.get<ToolsMockKeyValueSeeder>(
      ToolsMockKeyValueSeeder,
    );

    // seed mock data in memory database
    await keyValueRepository.insert(keyValueSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueKey property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        key: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueKey must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueType property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        type: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueType must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsCached property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isCached: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsCached must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsActive property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsActive must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueKey property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        key: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueKey must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueType property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        type: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueType must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsCached property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isCached: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsCached must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsActive property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsActive must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueKey is too large, has a maximum length of 64', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        key: '*****************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueKey is too large, has a maximum length of 64',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsCached has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isCached: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsCached has to be a boolean value',
        );
      });
  });
  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueIsActive has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueIsActive has to be a boolean value',
        );
      });
  });
  test('/REST:POST tools/key-value/create - Got 400 Conflict, KeyValueType has to be a enum option of ARRAY, BOOLEAN, DATE, NUMBER, OBJECT, SECRET, STRING, TIME, TIMESTAMP', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        type: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsKeyValueType has to be any of this options: ARRAY, BOOLEAN, DATE, NUMBER, OBJECT, SECRET, STRING, TIME, TIMESTAMP',
        );
      });
  });

  test('/REST:POST tools/key-value/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST tools/key-values/paginate', () => {
    return request(app.getHttpServer())
      .post('/tools/key-values/paginate')
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
          total: keyValueSeeder.collectionResponse.length,
          count: keyValueSeeder.collectionResponse.length,
          rows: keyValueSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST tools/key-values/get', () => {
    return request(app.getHttpServer())
      .post('/tools/key-values/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          keyValueSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST tools/key-value/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: 'e310b5a3-6e52-5acb-840f-d3867172f7c5',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST tools/key-value/create', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST tools/key-value/find', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/find')
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

  test('/REST:POST tools/key-value/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/find/a1fe458c-63b8-5ad9-9252-4db9cbfd8a6b')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST tools/key-value/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/tools/key-value/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT tools/key-value/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/tools/key-value/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: 'bbf0c4ae-5c45-5d42-a1fe-39b172410c53',
      })
      .expect(404);
  });

  test('/REST:PUT tools/key-value/update', () => {
    return request(app.getHttpServer())
      .put('/tools/key-value/update')
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

  test('/REST:DELETE tools/key-value/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/tools/key-value/delete/1146e44c-a5aa-5a11-86d0-76a2391d20fa')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE tools/key-value/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/tools/key-value/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL toolsCreateKeyValue - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateKeyValueInput!)
                    {
                        toolsCreateKeyValue (payload:$payload)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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

  test('/GraphQL toolsPaginateKeyValues', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateKeyValues (query:$query constraint:$constraint)
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
        expect(res.body.data.toolsPaginateKeyValues).toEqual({
          total: keyValueSeeder.collectionResponse.length,
          count: keyValueSeeder.collectionResponse.length,
          rows: keyValueSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL toolsGetKeyValues', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetKeyValues (query:$query)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        ] of res.body.data.toolsGetKeyValues.entries()) {
          expect(keyValueSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL toolsCreateKeyValue', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateKeyValueInput!)
                    {
                        toolsCreateKeyValue (payload:$payload)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsCreateKeyValue).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindKeyValue - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindKeyValue (query:$query)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: 'b4858510-aa01-534c-a795-00deca575154',
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

  test('/GraphQL toolsFindKeyValue', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindKeyValue (query:$query)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsFindKeyValue.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindKeyValueById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindKeyValueById (id:$id)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'fb64f681-06e1-5d34-b5f2-e00f9f43a2d2',
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

  test('/GraphQL toolsFindKeyValueById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindKeyValueById (id:$id)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsFindKeyValueById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateKeyValueById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateKeyValueByIdInput!)
                    {
                        toolsUpdateKeyValueById (payload:$payload)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: '4042d752-de51-51b7-8cba-68ec9a7ea93e',
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

  test('/GraphQL toolsUpdateKeyValueById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateKeyValueByIdInput!)
                    {
                        toolsUpdateKeyValueById (payload:$payload)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsUpdateKeyValueById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateKeyValues', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateKeyValuesInput! $query: QueryStatement)
                    {
                        toolsUpdateKeyValues (payload:$payload query:$query)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsUpdateKeyValues[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsDeleteKeyValueById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteKeyValueById (id:$id)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '76a00ccd-d614-5580-ac19-889c0770f456',
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

  test('/GraphQL toolsDeleteKeyValueById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteKeyValueById (id:$id)
                        {
                            id
                            rowId
                            key
                            type
                            value
                            isCached
                            isActive
                            description
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
        expect(res.body.data.toolsDeleteKeyValueById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await keyValueRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
