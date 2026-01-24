/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import {
  ToolsIMigrationRepository,
  toolsMockMigrationData,
  ToolsMockMigrationSeeder,
} from '@app/tools/migration';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('migration', () => {
  let app: INestApplication;
  let migrationRepository: ToolsIMigrationRepository;
  let migrationSeeder: ToolsMockMigrationSeeder;

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
      providers: [ToolsMockMigrationSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = toolsMockMigrationData;
    app = module.createNestApplication();
    migrationRepository = module.get<ToolsIMigrationRepository>(
      ToolsIMigrationRepository,
    );
    migrationSeeder = module.get<ToolsMockMigrationSeeder>(
      ToolsMockMigrationSeeder,
    );

    // seed mock data in memory database
    await migrationRepository.insert(migrationSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationName property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationName must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationVersion property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        version: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationVersion must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsActive property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsActive must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsExecuted property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isExecuted: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsExecuted must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationName property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationName must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationVersion property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        version: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationVersion must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsActive property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsActive must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsExecuted property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isExecuted: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsExecuted must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationName is too large, has a maximum length of 128', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '*********************************************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationName is too large, has a maximum length of 128',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationVersion is too large, has a maximum length of 16', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        version: '*****************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationVersion is too large, has a maximum length of 16',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsActive has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isActive: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsActive has to be a boolean value',
        );
      });
  });
  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationIsExecuted has to be a boolean value', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        isExecuted: 'true',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationIsExecuted has to be a boolean value',
        );
      });
  });
  test('/REST:POST tools/migration/create - Got 400 Conflict, MigrationExecutedAt has to be a timestamp value', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        executedAt: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsMigrationExecutedAt has to be a timestamp value',
        );
      });
  });

  test('/REST:POST tools/migration/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST tools/migrations/paginate', () => {
    return request(app.getHttpServer())
      .post('/tools/migrations/paginate')
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
          total: migrationSeeder.collectionResponse.length,
          count: migrationSeeder.collectionResponse.length,
          rows: migrationSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST tools/migrations/get', () => {
    return request(app.getHttpServer())
      .post('/tools/migrations/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          migrationSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST tools/migration/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: 'a672bcd4-7968-582a-9bf3-fc79f3bf4578',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST tools/migration/create', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST tools/migration/find', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/find')
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

  test('/REST:POST tools/migration/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/find/78b353ad-8eb9-5a06-813f-f7403aff777d')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST tools/migration/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/tools/migration/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT tools/migration/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/tools/migration/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: 'ae926667-4f83-514b-ba8f-fc5b13316776',
      })
      .expect(404);
  });

  test('/REST:PUT tools/migration/update', () => {
    return request(app.getHttpServer())
      .put('/tools/migration/update')
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

  test('/REST:DELETE tools/migration/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/tools/migration/delete/3f96afff-1a7f-57e8-8d40-d99401319279')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE tools/migration/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/tools/migration/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL toolsCreateMigration - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateMigrationInput!)
                    {
                        toolsCreateMigration (payload:$payload)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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

  test('/GraphQL toolsPaginateMigrations', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateMigrations (query:$query constraint:$constraint)
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
        expect(res.body.data.toolsPaginateMigrations).toEqual({
          total: migrationSeeder.collectionResponse.length,
          count: migrationSeeder.collectionResponse.length,
          rows: migrationSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL toolsGetMigrations', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetMigrations (query:$query)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        ] of res.body.data.toolsGetMigrations.entries()) {
          expect(migrationSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL toolsCreateMigration', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateMigrationInput!)
                    {
                        toolsCreateMigration (payload:$payload)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsCreateMigration).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindMigration - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindMigration (query:$query)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: 'ea0e00b2-ee8a-5919-b3c1-347a55eba98d',
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

  test('/GraphQL toolsFindMigration', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindMigration (query:$query)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsFindMigration.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindMigrationById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindMigrationById (id:$id)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'd65ccec1-532d-5b31-8a0e-383b722cdd08',
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

  test('/GraphQL toolsFindMigrationById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindMigrationById (id:$id)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsFindMigrationById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateMigrationById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateMigrationByIdInput!)
                    {
                        toolsUpdateMigrationById (payload:$payload)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: 'f1a701a0-5b76-50be-8616-83294f81a40f',
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

  test('/GraphQL toolsUpdateMigrationById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateMigrationByIdInput!)
                    {
                        toolsUpdateMigrationById (payload:$payload)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsUpdateMigrationById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateMigrations', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateMigrationsInput! $query: QueryStatement)
                    {
                        toolsUpdateMigrations (payload:$payload query:$query)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsUpdateMigrations[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsDeleteMigrationById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteMigrationById (id:$id)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '6a688969-1728-58e8-8117-e4372684225f',
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

  test('/GraphQL toolsDeleteMigrationById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteMigrationById (id:$id)
                        {
                            id
                            rowId
                            name
                            version
                            isActive
                            isExecuted
                            upScript
                            downScript
                            sort
                            executedAt
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
        expect(res.body.data.toolsDeleteMigrationById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await migrationRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
