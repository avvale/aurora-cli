/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import {
  CommonIAdministrativeAreaLevel1Repository,
  commonMockAdministrativeAreaLevel1Data,
  CommonMockAdministrativeAreaLevel1Seeder,
} from '@app/common/administrative-area-level-1';
import { GraphQLConfigModule } from '@aurora/modules/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-1', () => {
  let app: INestApplication;
  let administrativeAreaLevel1Repository: CommonIAdministrativeAreaLevel1Repository;
  let administrativeAreaLevel1Seeder: CommonMockAdministrativeAreaLevel1Seeder;

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
      providers: [CommonMockAdministrativeAreaLevel1Seeder],
    })
      .overrideGuard(AuthenticationJwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AuthorizationPermissionsGuard)
      .useValue({ canActivate: () => true })
      .compile();

    mockData = commonMockAdministrativeAreaLevel1Data;
    app = module.createNestApplication();
    administrativeAreaLevel1Repository =
      module.get<CommonIAdministrativeAreaLevel1Repository>(
        CommonIAdministrativeAreaLevel1Repository,
      );
    administrativeAreaLevel1Seeder =
      module.get<CommonMockAdministrativeAreaLevel1Seeder>(
        CommonMockAdministrativeAreaLevel1Seeder,
      );

    // seed mock data in memory database
    await administrativeAreaLevel1Repository.insert(
      administrativeAreaLevel1Seeder.collectionSource,
    );

    await app.init();
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Id must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        countryId: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1CountryId must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Code must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Name must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        slug: null,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Slug must be defined, can not be null',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Id must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        countryId: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1CountryId must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Code must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Name must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        slug: undefined,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Slug must be defined, can not be undefined',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Id is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        countryId: '*************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1CountryId is not allowed, must be a length of 36',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        code: '*********',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Code is too large, has a maximum length of 8',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 63', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        customCode:
          '****************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1CustomCode is too large, has a maximum length of 63',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 127', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        name: '********************************************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Name is too large, has a maximum length of 127',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 100', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        slug: '*****************************************************************************************************',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Slug is too large, has a maximum length of 100',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1MapType has to be a enum option of ROADMAP, SATELLITE, HYBRID, TERRAIN', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        mapType: '****',
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1MapType has to be any of this options: ROADMAP, SATELLITE, HYBRID, TERRAIN',
        );
      });
  });
  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum decimal integers length of 2', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        latitude: 111.11111111111111,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Latitude is too large, has a maximum length of 2 integers in',
        );
      });
  });
  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum decimal integers length of 3', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        longitude: 1111.11111111111111,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Longitude is too large, has a maximum length of 3 integers in',
        );
      });
  });
  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum decimals length of 14', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        latitude: 1.111111111111111,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Latitude is too large, has a maximum length of 14 decimals in',
        );
      });
  });
  test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum decimals length of 14', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        longitude: 11.111111111111111,
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'Value for CommonAdministrativeAreaLevel1Longitude is too large, has a maximum length of 14 decimals in',
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/create - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send(mockData[0])
      .expect(409);
  });

  test('/REST:POST common/administrative-areas-level-1/paginate', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-areas-level-1/paginate')
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
          total: administrativeAreaLevel1Seeder.collectionResponse.length,
          count: administrativeAreaLevel1Seeder.collectionResponse.length,
          rows: administrativeAreaLevel1Seeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/REST:POST common/administrative-areas-level-1/get', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-areas-level-1/get')
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          administrativeAreaLevel1Seeder.collectionResponse.map((item) =>
            expect.objectContaining(
              _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          ),
        );
      });
  });

  test('/REST:POST common/administrative-area-level-1/find - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/find')
      .set('Accept', 'application/json')
      .send({
        query: {
          where: {
            id: '42b0bbe3-6d5b-58a7-91fb-eb63c5d65092',
          },
        },
      })
      .expect(404);
  });

  test('/REST:POST common/administrative-area-level-1/create', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/create')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
      })
      .expect(201);
  });

  test('/REST:POST common/administrative-area-level-1/find', () => {
    return request(app.getHttpServer())
      .post('/common/administrative-area-level-1/find')
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

  test('/REST:POST common/administrative-area-level-1/find/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post(
        '/common/administrative-area-level-1/find/34f5ee7b-3597-5415-88f4-82f52682a122',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:POST common/administrative-area-level-1/find/{id}', () => {
    return request(app.getHttpServer())
      .post(
        '/common/administrative-area-level-1/find/5b19d6ac-4081-573b-96b3-56964d5326a8',
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

  test('/REST:PUT common/administrative-area-level-1/update - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .put('/common/administrative-area-level-1/update')
      .set('Accept', 'application/json')
      .send({
        ...mockData[0],
        id: '5733e96a-7e10-5321-95f3-e836c1187860',
      })
      .expect(404);
  });

  test('/REST:PUT common/administrative-area-level-1/update', () => {
    return request(app.getHttpServer())
      .put('/common/administrative-area-level-1/update')
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

  test('/REST:DELETE common/administrative-area-level-1/delete/{id} - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .delete(
        '/common/administrative-area-level-1/delete/d18b4ebb-c426-5e98-b9cb-05a77bd5ee6a',
      )
      .set('Accept', 'application/json')
      .expect(404);
  });

  test('/REST:DELETE common/administrative-area-level-1/delete/{id}', () => {
    return request(app.getHttpServer())
      .delete(
        '/common/administrative-area-level-1/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
      )
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('/GraphQL commonCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel1Input!)
                    {
                        commonCreateAdministrativeAreaLevel1 (payload:$payload)
                        {
                            id
                            countryId
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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

  test('/GraphQL commonPaginateAdministrativeAreasLevel1', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
        expect(res.body.data.commonPaginateAdministrativeAreasLevel1).toEqual({
          total: administrativeAreaLevel1Seeder.collectionResponse.length,
          count: administrativeAreaLevel1Seeder.collectionResponse.length,
          rows: administrativeAreaLevel1Seeder.collectionResponse
            .map((item) =>
              expect.objectContaining(
                _.omit(item, ['createdAt', 'updatedAt', 'deletedAt']),
              ),
            )
            .slice(0, 5),
        });
      });
  });

  test('/GraphQL commonGetAdministrativeAreasLevel1', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAdministrativeAreasLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        ] of res.body.data.commonGetAdministrativeAreasLevel1.entries()) {
          expect(
            administrativeAreaLevel1Seeder.collectionResponse[index],
          ).toEqual(
            expect.objectContaining(
              _.omit(value, ['createdAt', 'updatedAt', 'deletedAt']),
            ),
          );
        }
      });
  });

  test('/GraphQL commonCreateAdministrativeAreaLevel1', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel1Input!)
                    {
                        commonCreateAdministrativeAreaLevel1 (payload:$payload)
                        {
                            id
                            countryId
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        expect(
          res.body.data.commonCreateAdministrativeAreaLevel1,
        ).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonFindAdministrativeAreaLevel1 - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          query: {
            where: {
              id: '51db4de9-1f07-56c0-9c82-e6d714823979',
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

  test('/GraphQL commonFindAdministrativeAreaLevel1', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        expect(
          res.body.data.commonFindAdministrativeAreaLevel1.id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonFindAdministrativeAreaLevel1ById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '7106ef63-b466-5e62-b296-2bf701747a40',
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

  test('/GraphQL commonFindAdministrativeAreaLevel1ById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        expect(
          res.body.data.commonFindAdministrativeAreaLevel1ById.id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonUpdateAdministrativeAreaLevel1ById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel1ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          payload: {
            ...mockData[0],
            id: 'e27c9558-a556-522c-ad02-8983c96d1452',
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

  test('/GraphQL commonUpdateAdministrativeAreaLevel1ById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel1ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        expect(
          res.body.data.commonUpdateAdministrativeAreaLevel1ById.id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonUpdateAdministrativeAreasLevel1', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($payload:CommonUpdateAdministrativeAreasLevel1Input! $query: QueryStatement)
                    {
                        commonUpdateAdministrativeAreasLevel1 (payload:$payload query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
          res.body.data.commonUpdateAdministrativeAreasLevel1[0].id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  test('/GraphQL commonDeleteAdministrativeAreaLevel1ById - Got 404 Not Found', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
                            createdAt
                            updatedAt
                        }
                    }
                `,
        variables: {
          id: '192c556a-8d19-5faf-be2a-745b2ab5ba9c',
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

  test('/GraphQL commonDeleteAdministrativeAreaLevel1ById', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({
        query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            mapType
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
        expect(
          res.body.data.commonDeleteAdministrativeAreaLevel1ById.id,
        ).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
      });
  });

  afterAll(async () => {
    await administrativeAreaLevel1Repository.delete({
      queryStatement: {
        where: {},
      },
    });
    await app.close();
  });
});
