/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Seeder } from '@app/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.seeder';
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CommonModule } from '@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let administrativeAreaLevel2Repository: IAdministrativeAreaLevel2Repository;
    let administrativeAreaLevel2Seeder: MockAdministrativeAreaLevel2Seeder;

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
                MockAdministrativeAreaLevel2Seeder,
            ],
        })
            .compile();

        mockData = administrativeAreasLevel2;
        app = module.createNestApplication();
        administrativeAreaLevel2Repository = module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        administrativeAreaLevel2Seeder = module.get<MockAdministrativeAreaLevel2Seeder>(MockAdministrativeAreaLevel2Seeder);

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

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
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
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 59236574049474.93,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 66165960979339.19,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 122086865238.84126,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 4 decimals in');
            });
    });
    test('/REST:POST common/administrative-area-level-2/create - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 139855144825.39548,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 4 decimals in');
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
                        id: 'ce1df939-4bce-46ff-8ae2-5a81fa8aebaa',
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
            .post('/common/administrative-area-level-2/find/7bc05ae7-b54e-42a6-8282-360365c67f00')
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
                id: '03a76b92-8971-4676-b705-c2de2c3e4707',
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
            .delete('/common/administrative-area-level-2/delete/af37e886-8a1c-4742-a612-a0732a9de566')
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
                            id: '31a1f0e8-678c-4218-b468-3b6038868d68',
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e5da1b26-1ec3-458d-8399-e73628897779',
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '76c45d15-1b0a-4905-927f-cf4cdac88022',
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7b3d527f-65cf-43a3-8e88-19636a34e46a',
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