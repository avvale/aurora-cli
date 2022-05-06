/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '../../../src/@apps/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Seeder } from '../../../src/@apps/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel1Repository;
    let seeder: MockAdministrativeAreaLevel1Seeder;

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
                MockAdministrativeAreaLevel1Seeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        seeder          = module.get<MockAdministrativeAreaLevel1Seeder>(MockAdministrativeAreaLevel1Seeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryId: '253f9245-4e8e-4d71-b2f1-c3d345076882',
                code: 'ib5vu2ei',
                customCode: 'i47uuvzvvh',
                name: 'Handcrafted Wooden Table',
                slug: 'fugit-sed-enim',
                latitude: 24813581187644012,
                longitude: 59168052905724750,
                zoom: 54,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '337d47a4-c8b1-45c4-9ff1-cb6b68a216e6',
                countryId: null,
                code: '3h2d09bx',
                customCode: 'adivgc417k',
                name: 'Intelligent Rubber Pants',
                slug: 'minus-facilis-necessitatibus',
                latitude: 35800444752423028,
                longitude: 91994538060813090,
                zoom: 99,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '543072ee-44f2-4ebb-84c8-579225c60b17',
                countryId: '1411fbe0-1587-414e-a55b-f72aeb278ff0',
                code: null,
                customCode: 'p306w6j6s9',
                name: 'Refined Granite Table',
                slug: 'sit-tempore-saepe',
                latitude: 46406915122974660,
                longitude: 12704284881352216,
                zoom: 25,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '83deafc1-d87e-4a54-9014-c5d1a68042ca',
                countryId: 'a738b366-34f8-4473-bcfb-3be423a5511c',
                code: 'qk52udtg',
                customCode: 'nrplugvat3',
                name: null,
                slug: 'at-nam-quos',
                latitude: 53794339690512410,
                longitude: 73085587072487360,
                zoom: 90,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '66e08193-207a-48d3-ac88-f38de55d8faf',
                countryId: 'b2705a64-4a12-4f97-a67a-0b4386bd4419',
                code: 'f5rspeve',
                customCode: 'wltbp0t06o',
                name: 'Incredible Soft Ball',
                slug: null,
                latitude: 44238239470636420,
                longitude: 35306821890388604,
                zoom: 60,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                countryId: '2c7daab6-516e-4c8e-a43c-5b8645b6f12e',
                code: 'flzrrfrb',
                customCode: 'uogy5s9f0k',
                name: 'Handmade Rubber Fish',
                slug: 'recusandae-ad-qui',
                latitude: 50329337835147710,
                longitude: 21881004319771240,
                zoom: 43,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '58ca6ac2-a495-4670-897c-cf1a5951b2eb',
                code: '8iutjh6e',
                customCode: 'ry4ozvc1u8',
                name: 'Incredible Steel Shoes',
                slug: 'sed-doloremque-repellat',
                latitude: 16371184416699582,
                longitude: 33473288438360376,
                zoom: 92,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'a4264825-5805-4d9e-b0ab-14aee4544ccd',
                countryId: 'a5466ce8-f43c-49ef-95fd-eec183a75c0b',
                customCode: 'ryvfmr3m1r',
                name: 'Tasty Granite Bacon',
                slug: 'nulla-molestiae-voluptate',
                latitude: 38635327562115256,
                longitude: 20328367766918390,
                zoom: 34,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'c0ef5254-bb3e-474a-bff2-5690b1635ff5',
                countryId: 'f0a89204-81c2-404e-91a3-2d554217ace5',
                code: 's620df7o',
                customCode: 'r77fwseoht',
                slug: 'id-enim-qui',
                latitude: 30683365401327684,
                longitude: 18139746983505590,
                zoom: 61,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'dd72bd33-c1d6-4153-bcd2-81e34b96dc33',
                countryId: '36783c59-821c-41a3-92ec-43ac9495d188',
                code: 'kyfns86h',
                customCode: 's52z7iqdar',
                name: 'Handcrafted Granite Table',
                latitude: 59693093793135660,
                longitude: 15358925698053400,
                zoom: 93,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'd55fslxhnocgvpgnlrosc0w8rmb1dydr9my86',
                countryId: 'f32c20ea-2ecd-43dd-8459-c270f976d465',
                code: 'uvj7brin',
                customCode: 'nkbfqf91vm',
                name: 'Tasty Metal Ball',
                slug: 'voluptatem-quia-sed',
                latitude: 45773635691029700,
                longitude: 33587933826516080,
                zoom: 50,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'c3f7d6a3-6c3a-4b5f-9cf1-8625e46aaf5a',
                countryId: 'jcdc5a0d8kkhrdyr7uk4hcwsbcglligribpor',
                code: 'q1lzrnnp',
                customCode: 'uyb03s6etz',
                name: 'Intelligent Fresh Computer',
                slug: 'sint-consequatur-ut',
                latitude: 59881113307644290,
                longitude: 93746698617204380,
                zoom: 91,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '21a8dea7-a6aa-4718-a177-db24082e0a4f',
                countryId: '35994745-e10a-45ac-a62b-abad3c5e7ede',
                code: '0hs0pwnpc',
                customCode: 'w1znkx3s0y',
                name: 'Refined Metal Hat',
                slug: 'non-adipisci-et',
                latitude: 93157533488466780,
                longitude: 75347749329693840,
                zoom: 63,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'bdc06ded-f781-4dc8-b2a9-b78238b3e55b',
                countryId: '9dbf7cf7-9fe5-4ad8-a22d-b33848f434bd',
                code: '56d8tzm5',
                customCode: 'c0k0m0eoybx',
                name: 'Small Steel Hat',
                slug: 'praesentium-dolor-modi',
                latitude: 71547582798788776,
                longitude: 52279416658559950,
                zoom: 97,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '2bb3328c-fd27-4e31-8ab3-3fe3f398143c',
                countryId: '5b37a2c5-8899-4d11-b3db-58c9a5aef77d',
                code: '11ntglel',
                customCode: 'kgi1x9rxdn',
                name: 'sr35pf2qxrw5p426l1cy9hu23ro3xzx2addxivydikdphrjn7hwn5l6whylrq5ac6v3i8owddyl7pyltam39ydwe3dvrtihv6d26c4d3qlyhvfwdpwofo7ugynz7f3blqaa5xxpgtmusi27474l0ie9amtgkyibdotgxnskzha43fzbsgt0houbz3d4d1hffgpc168fk7fkw6ix8flxveu6ewg07riwh1isvdyqbxdwopyfjc1kqsct5bwv7jtcf',
                slug: 'animi-voluptate-consequatur',
                latitude: 73608385417617860,
                longitude: 81315780680880160,
                zoom: 19,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '89307dec-f49a-4d06-8bd9-0293445f4d42',
                countryId: 'e825d0ca-64f2-433b-b1db-d42de7fbd409',
                code: 'ly8bifx6',
                customCode: 'c6kzotsge6',
                name: 'Generic Plastic Pizza',
                slug: 'lodo0b192nnwhk62pl97lf76ul2ebwvdbhmbt0xqhh9f01xrdheuhgo88luxh8tivw3v6cr3ptwj0s65190s44ud6auw8rcwc1isxred9s24y7d51irkmqq1naedfgs5lh61a46ep0eh3vxlm87gyhpxol66td9af0ozptc6zypb9j85v65i2sx59vx6yxxyydvg42h9z589yyul8lme1pj7xf4e00b84s4buz1ubd4hg9fwv55nbho3q6f7jzq0',
                latitude: 12168017073424608,
                longitude: 99132035873579040,
                zoom: 98,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'bee14819-ae9a-47f2-9c21-662c4e7e38df',
                countryId: '22293067-4436-4717-8741-c1b748e5c82f',
                code: '0zf65196',
                customCode: '4c3f70d0h1',
                name: 'Tasty Steel Keyboard',
                slug: 'similique-voluptates-aspernatur',
                latitude: 428000834074393300,
                longitude: 90519220090413710,
                zoom: 60,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '91a3831c-7f31-42a1-8c35-a0ff5ff13f0f',
                countryId: 'bdfb3ffb-0304-40cd-8ac9-4d01bb275e1b',
                code: 'v299sw1o',
                customCode: 'vbqddhex6a',
                name: 'Intelligent Metal Gloves',
                slug: 'occaecati-magnam-fugit',
                latitude: 76543404565800690,
                longitude: 368670921993104800,
                zoom: 96,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'f650a4c8-bcf1-462a-8b4c-6b04e5fd3e93',
                countryId: '40be8cd8-c60e-44d8-97a7-61c7cae35bf9',
                code: '9l51q91m',
                customCode: '2pu2p6jb46',
                name: 'Fantastic Frozen Computer',
                slug: 'quas-tenetur-atque',
                latitude: 82669844804134380,
                longitude: 73641068866581140,
                zoom: 838,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '60247646-b109-44a0-be1e-be58366ea560',
                countryId: '7272f49b-5ff1-4e9b-8ce2-ebe677c84ece',
                code: 'crf9kfsc',
                customCode: 'bvkampy4yz',
                name: 'Small Cotton Keyboard',
                slug: 'qui-sit-ea',
                latitude: 38573317424490590,
                longitude: 29995629302550468,
                zoom: -9,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/administrative-area-level-1 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST common/administrative-areas-level-1/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-1/paginate')
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

    test('/REST:GET common/administrative-areas-level-1', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/administrative-area-level-1 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '83d1f5c5-8387-44ac-b6bf-f466f73e0bcc'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-1', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: 'e96470d8-c454-4e0f-903a-c394fa162836',
                code: 's5wau4mm',
                customCode: 'acgw15pov5',
                name: 'Generic Concrete Computer',
                slug: 'eos-doloremque-id',
                latitude: 62621142698484820,
                longitude: 47266180523385060,
                zoom: 87,
            })
            .expect(201);
    });

    test('/REST:GET common/administrative-area-level-1', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1')
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

    test('/REST:GET common/administrative-area-level-1/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1/023959ab-fc0d-4d2e-a003-e565d494fbae')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/administrative-area-level-1/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-1 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'f56f2e98-c339-4a5b-8210-2cb0252fd95e',
                countryId: '2823ec62-3d30-4822-8382-d173bb30ed4d',
                code: 'purbupkl',
                customCode: 'qjl3fqm790',
                name: 'Refined Metal Soap',
                slug: 'aspernatur-voluptatum-ipsa',
                latitude: 95290730484713040,
                longitude: 68962299822470870,
                zoom: 84,
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-1', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                code: '1a83x7xr',
                customCode: 'v6fqnfy1q4',
                name: 'Licensed Plastic Mouse',
                slug: 'est-accusantium-optio',
                latitude: 89637989211475410,
                longitude: 12806376167744192,
                zoom: 61,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/administrative-area-level-1/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-1/709133f4-577d-4d3f-bb52-da2e7aad4f69')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-1/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-1/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database', () =>
    {
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

    test('/GraphQL commonPaginateAdministrativeAreasLevel1', () =>
    {
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
                expect(res.body.data.commonPaginateAdministrativeAreasLevel1).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL commonGetAdministrativeAreasLevel1', () =>
    {
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
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel1.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel1', () =>
    {
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: 'a4lvlfpg',
                        customCode: 'y1wgvmauwg',
                        name: 'Sleek Plastic Bacon',
                        slug: 'impedit-voluptatum-quae',
                        latitude: 81614727141139040,
                        longitude: 86972709335166880,
                        zoom: 96,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonCreateAdministrativeAreaLevel1).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1 - Got 404 Not Found', () =>
    {
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
                            id: 'ed22ce7d-4f26-43ef-8f7d-d6d3c2e77c56'
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

    test('/GraphQL commonFindAdministrativeAreaLevel1', () =>
    {
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
                expect(res.body.data.commonFindAdministrativeAreaLevel1.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1ById - Got 404 Not Found', () =>
    {
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd978fc09-f0c3-437d-b68a-6324ec03794d'
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

    test('/GraphQL commonFindAdministrativeAreaLevel1ById', () =>
    {
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
                expect(res.body.data.commonFindAdministrativeAreaLevel1ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel1 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1Input!)
                    {
                        commonUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: 'df9bf2cb-42d9-4514-805d-bedbb3820890',
                        countryId: 'cba57538-37d1-4c04-81f2-99b48824e338',
                        code: '65omqkm1',
                        customCode: '661xfggunc',
                        name: 'Rustic Concrete Salad',
                        slug: 'pariatur-officia-ullam',
                        latitude: 69817998056772710,
                        longitude: 50130633813597460,
                        zoom: 58,
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

    test('/GraphQL commonUpdateAdministrativeAreaLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1Input!)
                    {
                        commonUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        code: 'zdql130q',
                        customCode: 't2zs4ifpa0',
                        name: 'Rustic Frozen Cheese',
                        slug: 'qui-ut-vitae',
                        latitude: 16665943017629524,
                        longitude: 53857206186625540,
                        zoom: 59,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreaLevel1.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel1ById - Got 404 Not Found', () =>
    {
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dd21a8ec-02c5-4f7c-b009-634f38eeab79'
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

    test('/GraphQL commonDeleteAdministrativeAreaLevel1ById', () =>
    {
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
                expect(res.body.data.commonDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});