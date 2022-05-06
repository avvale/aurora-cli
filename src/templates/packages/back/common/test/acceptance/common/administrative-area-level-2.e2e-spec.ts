/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '../../../src/@apps/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Seeder } from '../../../src/@apps/common/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel2Repository;
    let seeder: MockAdministrativeAreaLevel2Seeder;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                CommonModule,
                GraphQLConfigModule,
                SequelizeModule.forRoot({
                    dialect       : 'sqlite',
                    storage       : ':memory:',
                    logging       : false,
                    autoLoadModels: true,
                    models        : [],
                }),
            ],
            providers: [
                MockAdministrativeAreaLevel2Seeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);
        seeder          = module.get<MockAdministrativeAreaLevel2Seeder>(MockAdministrativeAreaLevel2Seeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryId: '6ab4c971-35e4-47df-beb9-2dbb945b2a7d',
                administrativeAreaLevel1Id: '7bb48e31-ac5d-4415-9d8c-871acef09680',
                code: 'zxkd461h',
                customCode: 'wef905iurr',
                name: 'Practical Metal Soap',
                slug: 'aut-quas-ea',
                latitude: 43578795906583140,
                longitude: 34253408638169536,
                zoom: 90,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '30fdcf9b-5f68-435a-8d99-429b359f45ef',
                countryId: null,
                administrativeAreaLevel1Id: '1074b9e4-2472-4cf6-9024-cb4acbc93090',
                code: '468czm1o',
                customCode: 'l90m2d3kxz',
                name: 'Unbranded Plastic Car',
                slug: 'voluptates-et-est',
                latitude: 54922632958562110,
                longitude: 58452905034194840,
                zoom: 97,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '03d4378b-04e0-4df8-b7cc-910c4d1f70a8',
                countryId: '1bef50eb-0530-4278-a8a4-fc45c9ef74c9',
                administrativeAreaLevel1Id: null,
                code: 'azuzkenu',
                customCode: '2viwi2kxdm',
                name: 'Generic Concrete Pants',
                slug: 'ut-at-culpa',
                latitude: 57620968480038540,
                longitude: 46949876324547820,
                zoom: 93,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'e906cc0f-6aa6-4b02-8425-878403d31b4e',
                countryId: '87afac01-69a5-4856-bf6e-f667c8a027bc',
                administrativeAreaLevel1Id: '175b0b11-cf1a-42d8-91bc-6e776aa41f19',
                code: null,
                customCode: 'vqrywtz9qr',
                name: 'Unbranded Steel Chips',
                slug: 'officiis-ut-voluptas',
                latitude: 77252949523150160,
                longitude: 52977090414417170,
                zoom: 49,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'c72b86c5-222e-4d73-8b56-05b9127854cf',
                countryId: 'f8012d8a-2cb9-42be-9be4-5ec8879a150e',
                administrativeAreaLevel1Id: '219dc2b9-951b-4c01-93a6-7e971520c45f',
                code: '9pni6jwv',
                customCode: 'oto77vc7vi',
                name: null,
                slug: 'voluptatum-debitis-aut',
                latitude: 55874835037750440,
                longitude: 54438576659874610,
                zoom: 92,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'd89979e7-1d8a-436d-b9f3-fe3514fe4d8e',
                countryId: '370cdf1e-358f-47c0-b2cd-0f59082021e3',
                administrativeAreaLevel1Id: '59bee884-957d-4fa1-b8b1-649b940d1b20',
                code: 'b1uaqm1q',
                customCode: '428flxovr4',
                name: 'Handmade Fresh Keyboard',
                slug: null,
                latitude: 71268383339468450,
                longitude: 48957928991511060,
                zoom: 68,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                countryId: '192b801b-c3f2-44c8-8609-0f4d01040514',
                administrativeAreaLevel1Id: '51b4b827-f955-4dfe-a160-53f93f8c4f78',
                code: 'wjr30szs',
                customCode: 'l1juzt6cjt',
                name: 'Awesome Cotton Ball',
                slug: 'rerum-et-quasi',
                latitude: 15113006828701248,
                longitude: 50834034444091210,
                zoom: 10,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '92a8da1e-2889-4c04-9ee9-f0b08310fe86',
                administrativeAreaLevel1Id: 'f931bf86-fbfb-4c70-ad5a-8b4a73c9a1c9',
                code: '80obgn2s',
                customCode: 'ii3bjdlmhl',
                name: 'Ergonomic Cotton Computer',
                slug: 'et-ipsa-id',
                latitude: 75653297080064160,
                longitude: 63622606089517440,
                zoom: 82,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'aa43c2ef-1843-442f-93ae-5cb9ee149bb2',
                countryId: 'cb585614-405d-4e7a-ad2a-f9104aa24936',
                code: '30ev347a',
                customCode: '0simes0gxl',
                name: 'Gorgeous Steel Table',
                slug: 'illo-sapiente-aut',
                latitude: 71718541173999304,
                longitude: 77475622642218020,
                zoom: 84,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '8f974f71-e007-4fc2-80b5-e1b10c383c6d',
                countryId: 'aac41010-5044-4699-af7a-0cd280c3bbaa',
                administrativeAreaLevel1Id: 'c9e04f04-3813-42b3-9956-95009cefe46f',
                customCode: 'ak9lotxncm',
                name: 'Intelligent Wooden Pizza',
                slug: 'quod-expedita-corrupti',
                latitude: 41837876735945920,
                longitude: 43597144334517780,
                zoom: 90,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '2a996327-ff17-46e5-b567-2c353552a0eb',
                countryId: '98305e16-2c0f-41e3-97b9-1bb6094b6e1a',
                administrativeAreaLevel1Id: 'b7d38bdf-9563-4d62-a67e-1dfc64d685fb',
                code: '157emtha',
                customCode: '5un23hq892',
                slug: 'porro-odit-est',
                latitude: 22460980836799990,
                longitude: 60744211764714290,
                zoom: 93,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'fa788e5f-fafc-49fd-9312-1b6209beb0ff',
                countryId: '567ac7b0-4880-4fe1-9cb4-1c0904f7528a',
                administrativeAreaLevel1Id: '0692b6bc-0e06-43ca-84fb-f0cfc43f7074',
                code: 'y14xeuds',
                customCode: 'o0esqrfq7k',
                name: 'Licensed Plastic Bike',
                latitude: 38238845587557176,
                longitude: 58718391588612910,
                zoom: 57,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '1kfthjtmw2z17mdzf3th1bi7g9v0qwogzv8rt',
                countryId: '62fd4c29-61b6-4422-8f55-24ecbf0f7280',
                administrativeAreaLevel1Id: '7527c96c-ab7c-4257-9e7d-16e345603b7b',
                code: '6497txz4',
                customCode: 'c4mcrgsipd',
                name: 'Generic Cotton Soap',
                slug: 'hic-reprehenderit-suscipit',
                latitude: 78766118644337310,
                longitude: 65417065164641820,
                zoom: 33,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '95f25d58-ecc5-4913-b334-65967216ba00',
                countryId: 'xcro85ym4g5jd3v9lowjuf0u9znjeplyvlux4',
                administrativeAreaLevel1Id: '2f5fe93c-1ff6-466a-baae-94d305f3904e',
                code: '7rwi0esq',
                customCode: 'u80mjkyo49',
                name: 'Gorgeous Rubber Ball',
                slug: 'laboriosam-qui-voluptates',
                latitude: 20002072752491610,
                longitude: 67327153628448504,
                zoom: 25,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '15808324-ed56-4632-8fda-f093d87c994b',
                countryId: 'c9ede72a-5c31-472c-999d-afdba8f06ca8',
                administrativeAreaLevel1Id: '34e09beb29jvn4431l80rqzhs67m8r7ffw6fh',
                code: 'h0bm39cm',
                customCode: 'n8fico6eu8',
                name: 'Tasty Granite Pizza',
                slug: 'accusamus-eum-tempore',
                latitude: 80991949203398720,
                longitude: 15285184795884486,
                zoom: 67,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'a77a59d7-e9c7-41fd-8904-fdd527e60701',
                countryId: 'fc063345-1a39-4362-abb7-384f87eb30fc',
                administrativeAreaLevel1Id: 'c4b8f75c-d937-4ebe-b14b-183be5d905a2',
                code: 'u2c8wtaeq',
                customCode: '8c6hpzbfcv',
                name: 'Incredible Concrete Salad',
                slug: 'qui-ad-cupiditate',
                latitude: 19958416485382030,
                longitude: 72580550299006910,
                zoom: 14,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '15e74e9c-84b1-4565-8331-f36eabdae263',
                countryId: 'cbc16a7b-a348-47cc-bcf1-91d1ef41be0a',
                administrativeAreaLevel1Id: 'f5e86631-e326-413f-ab93-2f2f842f60dc',
                code: 'b2d8nsrz',
                customCode: '4we0tdsdz43',
                name: 'Awesome Frozen Chicken',
                slug: 'consequatur-nemo-voluptatum',
                latitude: 17962434249248942,
                longitude: 81830006351933070,
                zoom: 36,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '2f2803b3-977c-4c4b-a575-1bef95d107fa',
                countryId: 'c8674a19-5b94-4d63-b81f-236422946065',
                administrativeAreaLevel1Id: '78831e68-fe17-40ec-af1c-63e5d2b7b657',
                code: 'j5j4y8ut',
                customCode: 'qfgkl19tok',
                name: 'g8krh82ot4e3eyx59bm4v0concgxhjzgcf4x6ne9vw4ducaryoklzgh6dc6c48lp5r57s6wjp7zziml9rj9rd2bpbniz1m20bz5cmtgew7extcz6sga5k76pplvdywv21he0vnf8x5dh5wskvr2ul92h1zr8w5f4xxk2ri1dtdnxtltbnvz4zllruq92bc1po2j8jx17itzxfzxkok87ccnelxlvflmf47k91oinhgaxlpme9s6py1epvhamzpwn',
                slug: 'et-minima-ipsa',
                latitude: 50647235609394856,
                longitude: 38504998329219060,
                zoom: 45,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'de4e7e79-dda4-4153-957b-047958cf92ff',
                countryId: '5d07e715-a392-4445-b2a1-409978b6bde4',
                administrativeAreaLevel1Id: 'a7c9112c-92f3-4ecf-b1cd-618905726f70',
                code: 'j100byn9',
                customCode: 'vg0dzcmqzy',
                name: 'Intelligent Metal Car',
                slug: 'no6hduziavu0z1hubl9ht743m1eftpl1m5l2niw17v0k4akiiy93poyjt0ier4twsj5l50vw1j4y0xw2uqq268er34jyj7usmj5stwlqslgqj0dmp7ee9mxc5rina4s6uwncxm5k0z6y9ivgb1z2ehh8ogvmmyo7w31g40aj4xxo0hvuafg0qt5gyraruqzx5oxe9mwkesgjc3xtk43f4tmrmn0gzpo9ixofcetndp62ex18vkssvylr4sgdg0e0',
                latitude: 81878502051795550,
                longitude: 98467281952762400,
                zoom: 55,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'c86c4621-817b-42fd-9518-ebd7117f74bf',
                countryId: '4d0c6ab8-19fa-44df-a969-44d23e49e335',
                administrativeAreaLevel1Id: 'cdbf0e4a-66a5-4f5a-a58d-f194ec238263',
                code: '1060528g',
                customCode: 'qzbfffujfb',
                name: 'Practical Metal Table',
                slug: 'dolor-nulla-id',
                latitude: 294678946914575000,
                longitude: 71133670766779496,
                zoom: 37,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '17bb2f8b-34b9-4bc2-a5bc-6a1f14ceea2d',
                countryId: 'f4769d57-33a4-49eb-87c6-6aa5654bf973',
                administrativeAreaLevel1Id: 'fe8f120e-988c-4634-bb1e-b6ba3a12de8e',
                code: 'u2okshv9',
                customCode: '678ghi1k8s',
                name: 'Refined Granite Bike',
                slug: 'in-et-amet',
                latitude: 92301052075905780,
                longitude: 770119785050790900,
                zoom: 79,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '55d29fa6-046c-4803-b63c-942415431c3b',
                countryId: 'c0efefc2-1019-45eb-a25f-fd95f3b7013c',
                administrativeAreaLevel1Id: 'db226ab4-0676-4ff7-a274-1b0ebcacf5c1',
                code: 'cr8cocnr',
                customCode: '91ywc3002n',
                name: 'Sleek Cotton Computer',
                slug: 'doloremque-velit-facilis',
                latitude: 34463999744258548,
                longitude: 80580936491641310,
                zoom: 497,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'decc4171-b6a8-4f45-aa1e-a04040d97d1a',
                countryId: 'ff24bf7b-f6df-4302-aba1-148fe26fffa6',
                administrativeAreaLevel1Id: '06e39c2d-d264-4b11-b56f-eabc9e40867d',
                code: 'o3vjf81b',
                customCode: 'qw49h02rb5',
                name: 'Generic Granite Fish',
                slug: 'placeat-voluptas-qui',
                latitude: 27490175715966650,
                longitude: 32016360081771668,
                zoom: -9,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/administrative-area-level-2 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
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
                    limit: 5
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET common/administrative-areas-level-2', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/administrative-area-level-2 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '05f0b1dd-536b-460d-8eee-e9fbccf62671'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: '58ebc462-a3a4-4ade-8be3-e357c20ad736',
                administrativeAreaLevel1Id: '6cedccfc-7400-4208-9e00-1899da21856e',
                code: 'onumo2ui',
                customCode: 'b11at90as4',
                name: 'Sleek Wooden Keyboard',
                slug: 'et-aut-molestiae',
                latitude: 35885594461814828,
                longitude: 39465344307911410,
                zoom: 54,
            })
            .expect(201);
    });

    test('/REST:GET common/administrative-area-level-2', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET common/administrative-area-level-2/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-2/5d171d9f-67b9-43b2-a123-ae49b22d9959')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/administrative-area-level-2/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-2/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-2 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'dc90c237-6789-480e-b143-2ea78c48327c',
                countryId: 'd5c1d1bf-2ada-4524-b3b1-1e0fcbfa96e1',
                administrativeAreaLevel1Id: 'eb14b154-399d-4eec-b001-2bb0dbd39b80',
                code: '1piji8p0',
                customCode: 'az4235excj',
                name: 'Ergonomic Fresh Bacon',
                slug: 'commodi-voluptas-aut',
                latitude: 78761731891431970,
                longitude: 44089394521790160,
                zoom: 39,
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-2', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                administrativeAreaLevel1Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                code: 'gpsdl7a8',
                customCode: 'igv64u18uv',
                name: 'Handcrafted Concrete Pizza',
                slug: 'eos-perferendis-quia',
                latitude: 63156464987479700,
                longitude: 87728422967942750,
                zoom: 70,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/administrative-area-level-2/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-2/bf935c85-d7cc-4831-9844-c17d57a88d76')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-2/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-2/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonPaginateAdministrativeAreasLevel2).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
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
                variables: {}
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel2.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        administrativeAreaLevel1Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: '35j6ltee',
                        customCode: 'wlmsnh56r2',
                        name: 'Licensed Cotton Computer',
                        slug: 'quibusdam-repellat-impedit',
                        latitude: 81318132448126400,
                        longitude: 54023698591555760,
                        zoom: 93,
                    }
                }
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
                            id: '90745319-3390-4289-8c2a-41902de378a9'
                        }
                    }
                }
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                    id: '967de9c0-a2c8-4915-abd6-f7b5e866cc25'
                }
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel2ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel2 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel2Input!)
                    {
                        commonUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: 'f485bb29-447f-4c00-8bcc-4d5f7be4a7ac',
                        countryId: 'e9be580f-eb2f-4eef-8d5f-290e106c0745',
                        administrativeAreaLevel1Id: 'd84cda60-ce9e-4072-835e-78c9f725b43a',
                        code: 'xgh9kmn1',
                        customCode: 'yxbvxyvno1',
                        name: 'Handcrafted Frozen Salad',
                        slug: 'ut-saepe-commodi',
                        latitude: 84113825985918670,
                        longitude: 55744063395611320,
                        zoom: 21,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel2', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel2Input!)
                    {
                        commonUpdateAdministrativeAreaLevel2 (payload:$payload)
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        administrativeAreaLevel1Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: 'm1yqf3aq',
                        customCode: '305r11w0n1',
                        name: 'Handmade Frozen Shirt',
                        slug: 'eum-nihil-ea',
                        latitude: 85480767651804000,
                        longitude: 78393553342174990,
                        zoom: 96,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreaLevel2.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
                    id: '3c72cc28-7bc0-4f44-bdc1-413d1469d1b8'
                }
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});