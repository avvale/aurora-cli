/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { MessageModule } from '@api/message/message.module';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  MessageIOutboxRepository,
  messageMockOutboxData,
  MessageMockOutboxSeeder,
} from '@app/message/outbox';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('outbox', () => {
  let app: INestApplication;
  let outboxRepository: MessageIOutboxRepository;
  let outboxSeeder: MessageMockOutboxSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        MessageModule,
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
      providers: [MessageMockOutboxSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = messageMockOutboxData;
    app = module.createNestApplication();
    outboxRepository = module.get<MessageIOutboxRepository>(
      MessageIOutboxRepository,
    );
    outboxSeeder = module.get<MessageMockOutboxSeeder>(MessageMockOutboxSeeder);

    // seed mock data in memory database
    await outboxRepository.insert(outboxSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxRowId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxRowId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxMessageId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        messageId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxMessageId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxRowId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        rowId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxRowId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxMessageId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        messageId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxMessageId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 400 Conflict, OutboxMessageId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        messageId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for MessageOutboxMessageId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST message/outbox/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST message/outboxes/paginate', () => {
    return request(app.getHttpServer())
      .post('/message/outboxes/paginate')
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
          total: outboxSeeder.collectionResponse.length,
          count: outboxSeeder.collectionResponse.length,
          rows: outboxSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST message/outboxes/get', () => {
    return request(app.getHttpServer())
      .post('/message/outboxes/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          outboxSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST message/outbox/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '91e1d6b0-3ca2-5e58-bce7-7431976ae7c1',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST message/outbox/create', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST message/outbox/find', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/find')
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

  test('/REST:POST message/outbox/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/find/91a32f57-dc71-57b3-addc-e729b08c4a76')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST message/outbox/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/message/outbox/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT message/outbox/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/message/outbox/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '6956c20e-9281-5793-a5c2-f1967997426b',
      })
      .expect(404);
  });

  test('/REST:PUT message/outbox/update', () => {
    return request(app.getHttpServer())
      .put('/message/outbox/update')
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

  test('/REST:DELETE message/outbox/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/message/outbox/delete/2fd77443-aa21-5049-b85f-b865d8fb2f65')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE message/outbox/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/message/outbox/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL messageCreateOutbox - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:MessageCreateOutboxInput!)
                    {
                        messageCreateOutbox (payload:$payload)
                        {
                            id
                            rowId
                            messageId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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

  test('/GraphQL messagePaginateOutboxes', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        messagePaginateOutboxes (query:$query constraint:$constraint)
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
        expect(res.body.data.messagePaginateOutboxes).toEqual({
          total: outboxSeeder.collectionResponse.length,
          count: outboxSeeder.collectionResponse.length,
          rows: outboxSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL messageGetOutboxes', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        messageGetOutboxes (query:$query)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        ] of res.body.data.messageGetOutboxes.entries()) {
          expect(outboxSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL messageCreateOutbox', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:MessageCreateOutboxInput!)
                    {
                        messageCreateOutbox (payload:$payload)
                        {
                            id
                            rowId
                            messageId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageCreateOutbox).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL messageFindOutbox - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        messageFindOutbox (query:$query)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: '8cf59389-00ed-59bb-8631-2ab41a7cf2a6',
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

  test('/GraphQL messageFindOutbox', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        messageFindOutbox (query:$query)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageFindOutbox.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL messageFindOutboxById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        messageFindOutboxById (id:$id)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'd491b8a4-8095-5da0-95e8-0fd4a549803d',
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

  test('/GraphQL messageFindOutboxById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        messageFindOutboxById (id:$id)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageFindOutboxById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL messageUpdateOutboxById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:MessageUpdateOutboxByIdInput!)
                    {
                        messageUpdateOutboxById (payload:$payload)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: '4fd315a7-3b9d-5631-abc6-a3fef3f1c98e',
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

  test('/GraphQL messageUpdateOutboxById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:MessageUpdateOutboxByIdInput!)
                    {
                        messageUpdateOutboxById (payload:$payload)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageUpdateOutboxById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL messageUpdateOutboxes', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:MessageUpdateOutboxesInput! $query: QueryStatement)
                    {
                        messageUpdateOutboxes (payload:$payload query:$query)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageUpdateOutboxes[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL messageDeleteOutboxById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteOutboxById (id:$id)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '44e9256a-4c7d-53da-884d-88fd4fb3b9e9',
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

  test('/GraphQL messageDeleteOutboxById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        messageDeleteOutboxById (id:$id)
                        {
                            id
                            rowId
                            accountRecipientIds
                            tenantRecipientIds
                            scopeRecipients
                            tagRecipients
                            meta
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
        expect(res.body.data.messageDeleteOutboxById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await outboxRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
