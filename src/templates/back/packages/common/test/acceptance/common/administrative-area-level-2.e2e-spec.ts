/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { CommonIAdministrativeAreaLevel2Repository, commonMockAdministrativeAreaLevel2Data, CommonMockAdministrativeAreaLevel2Seeder } from '@app/common/administrative-area-level-2';
import { Auth } from '@aurora/decorators';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let administrativeAreaLevel2Repository: CommonIAdministrativeAreaLevel2Repository;
    let administrativeAreaLevel2Seeder: CommonMockAdministrativeAreaLevel2Seeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                CommonModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                CommonMockAdministrativeAreaLevel2Seeder,
            ],
        })
            .overrideGuard(Auth)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = commonMockAdministrativeAreaLevel2Data;
        app = module.createNestApplication();
        administrativeAreaLevel2Repository = module.get<CommonIAdministrativeAreaLevel2Repository>(CommonIAdministrativeAreaLevel2Repository);
        administrativeAreaLevel2Seeder = module.get<CommonMockAdministrativeAreaLevel2Seeder>(CommonMockAdministrativeAreaLevel2Seeder);

        // seed mock data in memory database
        await administrativeAreaLevel2Repository.insert(administrativeAreaLevel2Seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2MapType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2MapType must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2MapType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2MapType must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customCode: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 100', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*****************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 100');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 100', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: '*****************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 100');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: 111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2MapType has to be a enum option of ROADMAP, SATELLITE, HYBRID, TERRAIN', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2MapType has to be any of this options: ROADMAP, SATELLITE, HYBRID, TERRAIN');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum decimal integers length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 372.49203196857235,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 2 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum decimal integers length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 5371.609946266088,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 3 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum decimals length of 14', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 1.150569788156931,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 14 decimals in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum decimals length of 14', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 94.49379404904876,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 14 decimals in');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/administrative-areas-level-2/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-2/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: administrativeAreaLevel2Seeder.collectionResponse.length,
                    count: administrativeAreaLevel2Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel2Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/administrative-areas-level-2/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-2/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    administrativeAreaLevel2Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/administrative-area-level-2/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'ac2cf91a-e481-5a1a-ad55-2f8e55911585',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-2/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/administrative-area-level-2/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:POST common/administrative-area-level-2/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/find/a571a0e2-d47c-5a9f-9997-4a746a5b10e4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-2/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-2/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-2/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '71c0c58f-a9bc-5841-a5a4-7a7a2df1870d',
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-2/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-2/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/administrative-area-level-2/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-2/delete/cf61bf53-ce15-5bab-915e-86b9574d064e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-2/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-2/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel2Input!)
                    {
                        commonCreateAdministrativeAreaLevel2 (payload:$payload)
                        {
                            id
                            countryId
                            administrativeAreaLevel1Id
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
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL commonPaginateAdministrativeAreasLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAdministrativeAreasLevel2 (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonPaginateAdministrativeAreasLevel2).toEqual({
                    total: administrativeAreaLevel2Seeder.collectionResponse.length,
                    count: administrativeAreaLevel2Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel2Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetAdministrativeAreasLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAdministrativeAreasLevel2 (query:$query)
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
            .then(res =>
            {
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel2.entries())
                {
                    expect(administrativeAreaLevel2Seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel2Input!)
                    {
                        commonCreateAdministrativeAreaLevel2 (payload:$payload)
                        {
                            id
                            countryId
                            administrativeAreaLevel1Id
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
            .then(res =>
            {
                expect(res.body.data.commonCreateAdministrativeAreaLevel2).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel2 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel2 (query:$query)
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '97d45c65-853d-51be-86f7-55e7b89bcfe2',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel2 (query:$query)
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
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel2.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel2ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel2ById (id:$id)
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
                    id: 'adc9405e-6726-5970-afa1-dc640cf4d290',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel2ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel2ById (id:$id)
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
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel2ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel2ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel2ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel2ById (payload:$payload)
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
                        id: 'd79da8e5-9055-5836-ac75-0448c6a3e337',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel2ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel2ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel2ById (payload:$payload)
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
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreaLevel2ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreasLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreasLevel2Input! $query: QueryStatement)
                    {
                        commonUpdateAdministrativeAreasLevel2 (payload:$payload query:$query)
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
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreasLevel2[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel2ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel2ById (id:$id)
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
                    id: '451239c4-6ff4-5b21-a146-e80f05f028d0',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel2ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel2ById (id:$id)
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
            .then(res =>
            {
                expect(res.body.data.commonDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await administrativeAreaLevel2Repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});