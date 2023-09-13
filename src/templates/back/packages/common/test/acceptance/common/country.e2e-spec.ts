/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { CommonICountryI18nRepository, CommonICountryRepository, commonMockCountryData, CommonMockCountrySeeder } from '@app/common/country';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CoreAddI18nConstraintService } from '@aurorajs.dev/core';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let countryRepository: CommonICountryRepository;
    let repositoryI18n: CommonICountryI18nRepository;
    let countrySeeder: CommonMockCountrySeeder;

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
                CommonMockCountrySeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .overrideProvider(CoreAddI18nConstraintService)
            .useValue({
                add: () =>
                    ({
                        include: [{
                            association: 'countryI18n',
                            required   : true,
                            where      : { langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a' },
                        }],
                    }),
            })
            .compile();

        mockData = commonMockCountryData;
        app = module.createNestApplication();
        countryRepository = module.get<CommonICountryRepository>(CommonICountryRepository);
        repositoryI18n  = module.get<CommonICountryI18nRepository>(CommonICountryI18nRepository);
        countrySeeder = module.get<CommonMockCountrySeeder>(CommonMockCountrySeeder);

        // seed mock data in memory database
        await countryRepository.insert(countrySeeder.collectionSource.filter((item, index, self) => index === self.findIndex(t => t.id.value === item.id.value)));
        await repositoryI18n.insert(countrySeeder.collectionSource, { dataFactory: aggregate => aggregate.toI18nDTO() });

        await app.init();
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha2: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha3: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Numeric property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Numeric: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Numeric must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryMapType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryMapType must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nLangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                langId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nLangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nName must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nSlug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nSlug must be defined, can not be null');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha2: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha3: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Numeric: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryMapType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryMapType must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nLangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                langId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nLangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nSlug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nSlug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha2: '***',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Alpha3: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                iso3166Numeric: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                langId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customCode: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                prefix: '******',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryPrefix is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                image: '*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryImage is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountrySort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sort: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountrySort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: 111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryZoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nName is too large, has a maximum length of 100', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*****************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nName is too large, has a maximum length of 100');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nSlug is too large, has a maximum length of 100', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: '*****************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nSlug is too large, has a maximum length of 100');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nAdministrativeAreaLevel1 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel1: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nAdministrativeAreaLevel2 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel2: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryI18nAdministrativeAreaLevel3 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                administrativeAreaLevel3: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryI18nAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country/create - Got 400 Conflict, CountryZoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical Value for CommonCountryZoom must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST common/country/create - Got 400 Conflict, CountryMapType has to be a enum option of ROADMAP, SATELLITE, HYBRID, TERRAIN', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mapType: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryMapType has to be any of this options: ROADMAP, SATELLITE, HYBRID, TERRAIN');
            });
    });
    test('/REST:POST common/country/create - Got 400 Conflict, CountryLatitude is too large, has a maximum decimal integers length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 111.11111111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryLatitude is too large, has a maximum length of 2 integers in');
            });
    });
    test('/REST:POST common/country/create - Got 400 Conflict, CountryLongitude is too large, has a maximum decimal integers length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 1111.11111111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryLongitude is too large, has a maximum length of 3 integers in');
            });
    });
    test('/REST:POST common/country/create - Got 400 Conflict, CountryLatitude is too large, has a maximum decimals length of 14', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 1.111111111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryLatitude is too large, has a maximum length of 14 decimals in');
            });
    });
    test('/REST:POST common/country/create - Got 400 Conflict, CountryLongitude is too large, has a maximum decimals length of 14', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 11.111111111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonCountryLongitude is too large, has a maximum length of 14 decimals in');
            });
    });

    test('/REST:POST common/country/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/countries/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/countries/paginate')
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
                    total: countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/countries/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/countries/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/country/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'adf98ef0-63f0-51db-8617-455b7ae32f3d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/country/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/country/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/find')
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

    test('/REST:POST common/country/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/find/31ceaeb7-8378-581c-914c-f8e31b3ab720')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST common/country/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/country/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '05cb3563-b462-5b52-ac18-36939eb5ea02',
            })
            .expect(404);
    });

    test('/REST:PUT common/country/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country/update')
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

    test('/REST:DELETE common/country/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/delete/45cc75d0-99f0-59f0-8bf8-19906649e782')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/country/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateCountry - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateCountryInput!)
                    {
                        commonCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            langId
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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

    test('/GraphQL commonPaginateCountries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateCountries).toEqual({
                    total: countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : countrySeeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetCountries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetCountries (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                for (const [index, value] of res.body.data.commonGetCountries.entries())
                {
                    expect(countrySeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateCountryInput!)
                    {
                        commonCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            langId
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonCreateCountry).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindCountry - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                            id: '3bcba77a-3f5a-5300-b4ba-0b11262412f1',
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

    test('/GraphQL commonFindCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonFindCountry.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindCountryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f7c0d94-c718-5643-8e9f-e3a9bc89b55d',
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

    test('/GraphQL commonFindCountryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonFindCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateCountryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryByIdInput!)
                    {
                        commonUpdateCountryById (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7731eef1-c23b-58fd-b194-b44e21d0a12d',
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

    test('/GraphQL commonUpdateCountryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryByIdInput!)
                    {
                        commonUpdateCountryById (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonUpdateCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateCountries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountriesInput! $query: QueryStatement)
                    {
                        commonUpdateCountries (payload:$payload query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonUpdateCountries[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteCountryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '85874859-f639-53ec-95ff-b53e4f05b1a3',
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

    test('/GraphQL commonDeleteCountryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            mapType
                            availableLangs
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonDeleteCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await countryRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
