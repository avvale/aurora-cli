/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  CommonIAttachmentFamilyRepository,
  commonMockAttachmentFamilyData,
  CommonMockAttachmentFamilySeeder,
} from '@app/common/attachment-family';
import { GraphQLConfigModule } from '@aurora/modules/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('attachment-family', () => {
  let app: INestApplication;
  let attachmentFamilyRepository: CommonIAttachmentFamilyRepository;
  let attachmentFamilySeeder: CommonMockAttachmentFamilySeeder;

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
      providers: [CommonMockAttachmentFamilySeeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = commonMockAttachmentFamilyData;
    app = module.createNestApplication();
    attachmentFamilyRepository = module.get<CommonIAttachmentFamilyRepository>(
      CommonIAttachmentFamilyRepository,
    );
    attachmentFamilySeeder = module.get<CommonMockAttachmentFamilySeeder>(
      CommonMockAttachmentFamilySeeder,
    );

    // seed mock data in memory database
    await attachmentFamilyRepository.insert(
      attachmentFamilySeeder.collectionSource,
    );

    await app.init();
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyResourceId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        resourceId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyResourceId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyCode property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyCode must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyName property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyName must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyResourceId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        resourceId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyResourceId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyCode property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyCode must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyName property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyName must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyResourceId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        resourceId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyResourceId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyCode is too large, has a maximum length of 63', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: '****************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyCode is too large, has a maximum length of 63',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 100', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '*****************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyName is too large, has a maximum length of 100',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyWidth has to be a integer value', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        width: 100.1,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyWidth has to be a integer value',
        );
      });
  });
  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyHeight has to be a integer value', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        height: 100.1,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyHeight has to be a integer value',
        );
      });
  });
  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyFitType has to be a enum option of FIT_CROP, FIT_WIDTH, FIT_HEIGHT, FIT_WIDTH_FREE_CROP, FIT_HEIGHT_FREE_CROP', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        fitType: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyFitType has to be any of this options: FIT_CROP, FIT_WIDTH, FIT_HEIGHT, FIT_WIDTH_FREE_CROP, FIT_HEIGHT_FREE_CROP',
        );
      });
  });
  test('/REST:POST common/attachment-family/create - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        format: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP',
        );
      });
  });

  test('/REST:POST common/attachment-family/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST common/attachment-families/paginate', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-families/paginate')
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
          total: attachmentFamilySeeder.collectionResponse.length,
          count: attachmentFamilySeeder.collectionResponse.length,
          rows: attachmentFamilySeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST common/attachment-families/get', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-families/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          attachmentFamilySeeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST common/attachment-family/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: 'd4796fcd-7b6a-5724-9e20-9818c8210095',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST common/attachment-family/create', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST common/attachment-family/find', () => {
    return request(app.getHttpServer())
      .post('/common/attachment-family/find')
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

  test('/REST:POST common/attachment-family/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post(
        '/common/attachment-family/find/f28d7125-c6d2-5526-a327-514b4bc9e34e',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST common/attachment-family/find/{id}', () => {
    return request(app.getHttpServer())
      .post(
        '/common/attachment-family/find/5b19d6ac-4081-573b-96b3-56964d5326a8',
      )
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/REST:PUT common/attachment-family/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/common/attachment-family/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '9d9336e4-5dcf-5438-a88e-da80b57403ec',
      })
      .expect(404);
  });

  test('/REST:PUT common/attachment-family/update', () => {
    return request(app.getHttpServer())
      .put('/common/attachment-family/update')
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

  test('/REST:DELETE common/attachment-family/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete(
        '/common/attachment-family/delete/ccd4138a-49f0-596e-9dde-16a462d202ae',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE common/attachment-family/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete(
        '/common/attachment-family/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
      )
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL commonCreateAttachmentFamily - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateAttachmentFamilyInput!)
                    {
                        commonCreateAttachmentFamily (payload:$payload)
                        {
                            id
                            resourceId
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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

  test('/GraphQL commonPaginateAttachmentFamilies', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
        expect(res.body.data.commonPaginateAttachmentFamilies).toEqual({
          total: attachmentFamilySeeder.collectionResponse.length,
          count: attachmentFamilySeeder.collectionResponse.length,
          rows: attachmentFamilySeeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL commonGetAttachmentFamilies', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAttachmentFamilies (query:$query)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        ] of res.body.data.commonGetAttachmentFamilies.entries()) {
          expect(attachmentFamilySeeder.collectionResponse[index]).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL commonCreateAttachmentFamily', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateAttachmentFamilyInput!)
                    {
                        commonCreateAttachmentFamily (payload:$payload)
                        {
                            id
                            resourceId
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(res.body.data.commonCreateAttachmentFamily).toHaveProperty(
          'id',
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonFindAttachmentFamily - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachmentFamily (query:$query)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: 'de17cf2d-830c-5981-869d-17187d24dc36',
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

  test('/GraphQL commonFindAttachmentFamily', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachmentFamily (query:$query)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(res.body.data.commonFindAttachmentFamily.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonFindAttachmentFamilyById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentFamilyById (id:$id)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '9deb3919-719a-5a3f-b085-2ddb6b287ced',
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

  test('/GraphQL commonFindAttachmentFamilyById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentFamilyById (id:$id)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(res.body.data.commonFindAttachmentFamilyById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonUpdateAttachmentFamilyById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAttachmentFamilyByIdInput!)
                    {
                        commonUpdateAttachmentFamilyById (payload:$payload)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: '9f7effdf-5387-5252-b072-240c29d03844',
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

  test('/GraphQL commonUpdateAttachmentFamilyById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAttachmentFamilyByIdInput!)
                    {
                        commonUpdateAttachmentFamilyById (payload:$payload)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(res.body.data.commonUpdateAttachmentFamilyById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  test('/GraphQL commonUpdateAttachmentFamilies', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAttachmentFamiliesInput! $query: QueryStatement)
                    {
                        commonUpdateAttachmentFamilies (payload:$payload query:$query)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(
          res.body.data.commonUpdateAttachmentFamilies[0].id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonDeleteAttachmentFamilyById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentFamilyById (id:$id)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '4c29bdd3-554e-59db-981f-7ca1b3f378ce',
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

  test('/GraphQL commonDeleteAttachmentFamilyById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentFamilyById (id:$id)
                        {
                            id
                            code
                            name
                            width
                            height
                            fitType
                            quality
                            sizes
                            format
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
        expect(res.body.data.commonDeleteAttachmentFamilyById.id).toStrictEqual(
          '5b19d6ac-4081-573b-96b3-56964d5326a8',
        );
      });
  });

  afterAll(async () => {
    await attachmentFamilyRepository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
