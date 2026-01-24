/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { WhatsappModule } from '@api/whatsapp/whatsapp.module';
import {
  WhatsappITimelineRepository,
  whatsappMockTimelineData,
  WhatsappMockTimelineSeeder,
} from '@app/whatsapp/timeline';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('timeline', () => {
  let app: INestApplication;
  let timelineRepository: WhatsappITimelineRepository;
  let timelineSeeder: WhatsappMockTimelineSeeder;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockData: any;

  // set timeout to 60s by default are 5s
  jest.setTimeout(60000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...importForeignModules,
        WhatsappModule,
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
      providers: [WhatsappMockTimelineSeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = whatsappMockTimelineData;
    app = module.createNestApplication();
    timelineRepository = module.get<WhatsappITimelineRepository>(
      WhatsappITimelineRepository,
    );
    timelineSeeder = module.get<WhatsappMockTimelineSeeder>(
      WhatsappMockTimelineSeeder,
    );

    // seed mock data in memory database
    await timelineRepository.insert(timelineSeeder.collectionSource);

    await app.init();
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaPhoneNumberId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaPhoneNumberId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaPhoneNumberId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaContactId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaContactId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaContactId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaPhoneNumberId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaPhoneNumberId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaPhoneNumberId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaContactId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaContactId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaContactId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaPhoneNumberId is too large, has a maximum length of 36', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaPhoneNumberId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaPhoneNumberId is too large, has a maximum length of 36',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 400 Conflict, TimelineWabaContactId is too large, has a maximum length of 36', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        wabaContactId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for WhatsappTimelineWabaContactId is too large, has a maximum length of 36',
        );
      });
  });

  test('/REST:POST whatsapp/timeline/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST whatsapp/timelines/paginate', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timelines/paginate')
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
          total: timelineSeeder.collectionResponse.length,
          count: timelineSeeder.collectionResponse.length,
          rows: timelineSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST whatsapp/timelines/get', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timelines/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          timelineSeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST whatsapp/timeline/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '9f867c99-6fb0-5a6d-8d3d-0e0d9f4ca695',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST whatsapp/timeline/create', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST whatsapp/timeline/find', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/find')
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

  test('/REST:POST whatsapp/timeline/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/find/bf1a3822-7e54-5fa8-99ae-d0c642a16803')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST whatsapp/timeline/find/{id}', () => {
    return request(app.getHttpServer())
      .post('/whatsapp/timeline/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT whatsapp/timeline/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/whatsapp/timeline/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '9659ce50-9dca-5ceb-b2f2-dc0424d6bf88',
      })
      .expect(404);
  });

  test('/REST:PUT whatsapp/timeline/update', () => {
    return request(app.getHttpServer())
      .put('/whatsapp/timeline/update')
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

  test('/REST:DELETE whatsapp/timeline/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete('/whatsapp/timeline/delete/53c735f5-1990-51c2-892f-68239060c601')
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE whatsapp/timeline/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete('/whatsapp/timeline/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL whatsappCreateTimeline - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:WhatsappCreateTimelineInput!)
                    {
                        whatsappCreateTimeline (payload:$payload)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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

  test('/GraphQL whatsappPaginateTimelines', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        whatsappPaginateTimelines (query:$query constraint:$constraint)
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
        expect(res.body.data.whatsappPaginateTimelines).toEqual({
          total: timelineSeeder.collectionResponse.length,
          count: timelineSeeder.collectionResponse.length,
          rows: timelineSeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL whatsappGetTimelines', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        whatsappGetTimelines (query:$query)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        ] of res.body.data.whatsappGetTimelines.entries()) {
          expect(timelineSeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL whatsappCreateTimeline', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:WhatsappCreateTimelineInput!)
                    {
                        whatsappCreateTimeline (payload:$payload)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappCreateTimeline).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL whatsappFindTimeline - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindTimeline (query:$query)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: '6ac402d0-8ef0-5149-adf7-6b8a82c9439c',
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

  test('/GraphQL whatsappFindTimeline', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        whatsappFindTimeline (query:$query)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappFindTimeline.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL whatsappFindTimelineById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        whatsappFindTimelineById (id:$id)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: 'c2c63282-3442-5e8e-9eef-44a7a5c2d297',
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

  test('/GraphQL whatsappFindTimelineById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        whatsappFindTimelineById (id:$id)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappFindTimelineById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL whatsappUpdateTimelineById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:WhatsappUpdateTimelineByIdInput!)
                    {
                        whatsappUpdateTimelineById (payload:$payload)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: '3c45f4b3-15be-5814-b7ca-77c650f22fee',
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

  test('/GraphQL whatsappUpdateTimelineById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:WhatsappUpdateTimelineByIdInput!)
                    {
                        whatsappUpdateTimelineById (payload:$payload)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappUpdateTimelineById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL whatsappUpdateTimelines', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:WhatsappUpdateTimelinesInput! $query: QueryStatement)
                    {
                        whatsappUpdateTimelines (payload:$payload query:$query)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappUpdateTimelines[0].id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL whatsappDeleteTimelineById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteTimelineById (id:$id)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '3d653584-ae9f-5cea-a864-e8df90df1d77',
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

  test('/GraphQL whatsappDeleteTimelineById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        whatsappDeleteTimelineById (id:$id)
                        {
                            id
                            accounts
                            wabaPhoneNumberId
                            wabaContactId
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
        expect(res.body.data.whatsappDeleteTimelineById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await timelineRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
