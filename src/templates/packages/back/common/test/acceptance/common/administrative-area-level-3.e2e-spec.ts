/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Seeder } from '@app/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.seeder';
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CommonModule } from '@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let administrativeAreaLevel3Repository: IAdministrativeAreaLevel3Repository;
    let administrativeAreaLevel3Seeder: MockAdministrativeAreaLevel3Seeder;

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
                MockAdministrativeAreaLevel3Seeder,
            ],
        })
            .compile();

        mockData = administrativeAreasLevel3;
        app = module.createNestApplication();
        administrativeAreaLevel3Repository = module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        administrativeAreaLevel3Seeder = module.get<MockAdministrativeAreaLevel3Seeder>(MockAdministrativeAreaLevel3Seeder);

        // seed mock data in memory database
        await administrativeAreaLevel3Repository.insert(administrativeAreaLevel3Seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel2Id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel2Id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1Id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel2Id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customCode: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: 111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel3Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 88648902483445.12,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 30847994072442.973,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 952379223776.788,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 4 decimals in');
            });
    });
    test('/REST:POST common/administrative-area-level-3/create - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 205652984148.17084,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 4 decimals in');
            });
    });

    test('/REST:POST common/administrative-area-level-3/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/administrative-areas-level-3/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-3/paginate')
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
                    total: administrativeAreaLevel3Seeder.collectionResponse.length,
                    count: administrativeAreaLevel3Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel3Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/administrative-areas-level-3/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-3/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    administrativeAreaLevel3Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/administrative-area-level-3/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '52d37690-b39a-41c7-8dae-7f29367a9b9a',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-3/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/administrative-area-level-3/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/find')
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

    test('/REST:POST common/administrative-area-level-3/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/find/0499fbff-31ca-47f0-b70c-4118f5c67eea')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-3/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-3/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-3/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '06584582-75c4-4d8e-bf99-cf98778182de',
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-3/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-3/update')
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

    test('/REST:DELETE common/administrative-area-level-3/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-3/delete/1dcc439c-997e-4bac-8a3b-b9ab2fa61a7c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-3/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-3/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel3Input!)
                    {
                        commonCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            countryId
                            administrativeAreaLevel1Id
                            administrativeAreaLevel2Id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL commonPaginateAdministrativeAreasLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAdministrativeAreasLevel3 (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateAdministrativeAreasLevel3).toEqual({
                    total: administrativeAreaLevel3Seeder.collectionResponse.length,
                    count: administrativeAreaLevel3Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel3Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetAdministrativeAreasLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAdministrativeAreasLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel3.entries())
                {
                    expect(administrativeAreaLevel3Seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel3Input!)
                    {
                        commonCreateAdministrativeAreaLevel3 (payload:$payload)
                        {
                            id
                            countryId
                            administrativeAreaLevel1Id
                            administrativeAreaLevel2Id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonCreateAdministrativeAreaLevel3).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel3 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: 'e61f01dc-1cb3-499b-8d18-44beaf50e96c',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel3 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonFindAdministrativeAreaLevel3.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel3ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f8fd04bb-b789-47bb-b887-9b7962526f14',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel3ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonFindAdministrativeAreaLevel3ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel3ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel3ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel3ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'f337deac-98f9-464b-91bc-fc704bc9117e',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel3ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel3ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel3ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonUpdateAdministrativeAreaLevel3ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreasLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreasLevel3Input! $query: QueryStatement)
                    {
                        commonUpdateAdministrativeAreasLevel3 (payload:$payload query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonUpdateAdministrativeAreasLevel3[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel3ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8f73a34e-afd8-49a5-8107-b0b2641c94f6',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel3ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel3ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                expect(res.body.data.commonDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await administrativeAreaLevel3Repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});