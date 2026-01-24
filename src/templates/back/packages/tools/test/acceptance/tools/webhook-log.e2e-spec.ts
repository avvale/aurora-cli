/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import {
  ToolsIWebhookLogRepository,
  toolsMockWebhookLogData,
  ToolsMockWebhookLogSeeder,
} from '@app/tools/webhook-log';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('webhook-log', () => {
  let app: INestApplication;
  let webhookLogRepository: ToolsIWebhookLogRepository;
  let webhookLogSeeder: ToolsMockWebhookLogSeeder;

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
      providers: [ToolsMockWebhookLogSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = toolsMockWebhookLogData;
    app = module.createNestApplication();
    webhookLogRepository = module.get<ToolsIWebhookLogRepository>(
      ToolsIWebhookLogRepository,
    );
    webhookLogSeeder = module.get<ToolsMockWebhookLogSeeder>(
      ToolsMockWebhookLogSeeder,
    );

    // seed mock data in memory database
    await webhookLogRepository.insert(webhookLogSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogUrl property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        url: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogUrl must be defined, can not be null',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogUrl property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        url: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogUrl must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 400 Conflict, WebhookLogUrl is too large, has a maximum length of 2046', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        url: '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for ToolsWebhookLogUrl is too large, has a maximum length of 2046',
        );
      });
  });

  test('/REST:POST tools/webhook-log/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST tools/webhook-logs/paginate', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-logs/paginate')
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
          total: webhookLogSeeder.collectionResponse.length,
          count: webhookLogSeeder.collectionResponse.length,
          rows: webhookLogSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST tools/webhook-logs/get', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-logs/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          webhookLogSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST tools/webhook-log/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '586424e8-db3a-549e-9be3-2f26239d9a56',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST tools/webhook-log/create', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST tools/webhook-log/find', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/find')
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

  test('/REST:POST tools/webhook-log/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/find/3054e447-af13-5ddf-8ed9-b70e5f605203')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST tools/webhook-log/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/tools/webhook-log/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT tools/webhook-log/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/tools/webhook-log/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '11d95f0b-7301-5973-b52e-ec3a75bb873b',
      })
      .expect(404);
  });

  test('/REST:PUT tools/webhook-log/update', () => {
    return request(app.getHttpServer())
      .put('/tools/webhook-log/update')
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

  test('/REST:DELETE tools/webhook-log/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/tools/webhook-log/delete/c35c7b15-e65d-5452-93c3-e5d0d026433a')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE tools/webhook-log/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/tools/webhook-log/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL toolsCreateWebhookLog - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateWebhookLogInput!)
                    {
                        toolsCreateWebhookLog (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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

  test('/GraphQL toolsPaginateWebhookLogs', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateWebhookLogs (query:$query constraint:$constraint)
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
        expect(res.body.data.toolsPaginateWebhookLogs).toEqual({
          total: webhookLogSeeder.collectionResponse.length,
          count: webhookLogSeeder.collectionResponse.length,
          rows: webhookLogSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL toolsGetWebhookLogs', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetWebhookLogs (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        ] of res.body.data.toolsGetWebhookLogs.entries()) {
          expect(webhookLogSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL toolsCreateWebhookLog', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsCreateWebhookLogInput!)
                    {
                        toolsCreateWebhookLog (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsCreateWebhookLog).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindWebhookLog - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhookLog (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: 'a23f3fba-10c8-5755-b1a1-df932ef0ad43',
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

  test('/GraphQL toolsFindWebhookLog', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindWebhookLog (query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsFindWebhookLog.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsFindWebhookLogById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookLogById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '965562d2-0812-5350-97a9-51de7c7c00f8',
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

  test('/GraphQL toolsFindWebhookLogById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        toolsFindWebhookLogById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsFindWebhookLogById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateWebhookLogById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateWebhookLogByIdInput!)
                    {
                        toolsUpdateWebhookLogById (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: 'a4430984-983a-5740-844f-c10701e69f8f',
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

  test('/GraphQL toolsUpdateWebhookLogById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateWebhookLogByIdInput!)
                    {
                        toolsUpdateWebhookLogById (payload:$payload)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsUpdateWebhookLogById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsUpdateWebhookLogs', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:ToolsUpdateWebhookLogsInput! $query: QueryStatement)
                    {
                        toolsUpdateWebhookLogs (payload:$payload query:$query)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsUpdateWebhookLogs[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL toolsDeleteWebhookLogById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookLogById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '6c83cfcb-e11c-5244-b171-afb822cdf1fe',
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

  test('/GraphQL toolsDeleteWebhookLogById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteWebhookLogById (id:$id)
                        {
                            id
                            rowId
                            url
                            headerRequest
                            bodyRequest
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
        expect(res.body.data.toolsDeleteWebhookLogById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await webhookLogRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
