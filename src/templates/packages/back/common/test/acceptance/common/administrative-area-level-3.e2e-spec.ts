/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '../../../src/@apps/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Seeder } from '../../../src/@apps/common/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: IAdministrativeAreaLevel3Repository;
    let seeder: MockAdministrativeAreaLevel3Seeder;

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
                MockAdministrativeAreaLevel3Seeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);
        seeder          = module.get<MockAdministrativeAreaLevel3Seeder>(MockAdministrativeAreaLevel3Seeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryId: '7227b78f-df56-47e0-ba0a-c884d7d6cd1b',
                administrativeAreaLevel1Id: '55b77033-5699-4074-baaa-531351504794',
                administrativeAreaLevel2Id: 'b7a861ef-5e3e-4f6d-942b-5a9b11d522cb',
                code: '6qjl47rh',
                customCode: 'astc2hdkaz',
                name: 'Sleek Fresh Fish',
                slug: 'dignissimos-aperiam-ut',
                latitude: 33987974988621348,
                longitude: 84064602316397860,
                zoom: 28,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'db993492-8032-447f-b8b7-001867a6697e',
                countryId: null,
                administrativeAreaLevel1Id: 'afddd5f6-e2d9-42f3-a114-c144e71a203a',
                administrativeAreaLevel2Id: '8f76a6f9-245e-464c-9714-74f12a19cc14',
                code: 'imo2k7v5',
                customCode: 'cbexvbpr19',
                name: 'Fantastic Granite Hat',
                slug: 'animi-reiciendis-dolorem',
                latitude: 19405766589739110,
                longitude: 92457915451149820,
                zoom: 57,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '9de8b3c6-8601-4a26-9215-8cf320adc2b2',
                countryId: '97f26f43-1007-40fe-a05a-d6c3283be809',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: 'bedee122-4076-463e-9a6a-7a21c68a3571',
                code: 'bcjo9j7a',
                customCode: 'phjsjoptvu',
                name: 'Handcrafted Metal Ball',
                slug: 'nihil-vel-beatae',
                latitude: 23483092328161776,
                longitude: 34677920478323616,
                zoom: 90,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '6046e260-6fb1-48cd-9dec-5affbc9a9dd4',
                countryId: 'c8d4a788-990c-4c7a-9aec-3d380b727556',
                administrativeAreaLevel1Id: 'be37ad33-a792-456e-992f-742fa650b0be',
                administrativeAreaLevel2Id: null,
                code: 'cby8syix',
                customCode: 'buotqnhzdp',
                name: 'Generic Metal Table',
                slug: 'maxime-quia-et',
                latitude: 53863149455923180,
                longitude: 52454743553916010,
                zoom: 17,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '40a355f5-39d9-4d23-a6b4-a4605f7acf07',
                countryId: '16502bca-b80e-4115-9df9-5163aa8f8200',
                administrativeAreaLevel1Id: 'bdaa5af6-4467-47de-bf05-be170c787920',
                administrativeAreaLevel2Id: 'd784bb3d-420d-4375-97e9-5056ca4f7e33',
                code: null,
                customCode: 'dhigpoctp4',
                name: 'Gorgeous Granite Chair',
                slug: 'quis-omnis-asperiores',
                latitude: 93147969962729500,
                longitude: 44904804699034950,
                zoom: 27,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '4b7d1e13-31c4-4143-8de1-3e60c8c54f84',
                countryId: '4f8623eb-2063-4d7b-8417-e4baefaecd74',
                administrativeAreaLevel1Id: '315dff2f-dc02-42b6-bd79-698e886784d8',
                administrativeAreaLevel2Id: 'ff567166-da17-4871-969f-8ba050489cfc',
                code: 'ij8s6zx4',
                customCode: 'ywgkjbilyb',
                name: null,
                slug: 'eos-iusto-aliquid',
                latitude: 32013827451287416,
                longitude: 91257349576775260,
                zoom: 50,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '23883144-0286-4ccb-a6f0-29daf910670a',
                countryId: '71ff6a3f-b1e3-4a61-bac2-c8c726ad627e',
                administrativeAreaLevel1Id: 'b4150e8f-0be3-4594-8723-30d9959c8c0c',
                administrativeAreaLevel2Id: '1ac6887a-8358-49f5-9d64-55afb166d58d',
                code: 'n8cv2r3j',
                customCode: 'di85hdznbg',
                name: 'Rustic Steel Shirt',
                slug: null,
                latitude: 36131537931893576,
                longitude: 32511002143874810,
                zoom: 86,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                countryId: 'e14bc1a9-4d97-44fe-8fb4-aad923043e1f',
                administrativeAreaLevel1Id: '46640883-7a77-4953-899b-c6da62b74458',
                administrativeAreaLevel2Id: '7990a959-4765-4bcd-bd2a-f86378fc94c0',
                code: 'xs3gf8kd',
                customCode: 'oykxsrke40',
                name: 'Fantastic Cotton Salad',
                slug: 'aperiam-dignissimos-ut',
                latitude: 59540637460246990,
                longitude: 49885511736464130,
                zoom: 44,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '8470a881-d2fe-4608-aeda-b7399e4d9486',
                administrativeAreaLevel1Id: 'b7922c33-1d23-461f-aeff-ab85e937e1bf',
                administrativeAreaLevel2Id: 'abac2f4d-c404-4735-9814-71729494bba9',
                code: 'vvmeckgs',
                customCode: '5py62764u9',
                name: 'Licensed Plastic Mouse',
                slug: 'quas-doloribus-quas',
                latitude: 15980639488139530,
                longitude: 40640387974488024,
                zoom: 93,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '702eaf90-4203-40bc-87a8-e97cd22084ae',
                countryId: 'eeb211fd-cd30-4c71-aa18-b51525ad9954',
                administrativeAreaLevel2Id: 'db3a8e94-ca66-4b39-85fd-80afba76dbe0',
                code: '2dutma6y',
                customCode: 'ys1chq3pqw',
                name: 'Sleek Metal Bacon',
                slug: 'vero-id-quo',
                latitude: 84195656401173620,
                longitude: 42708083963339390,
                zoom: 78,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '1cfdfa85-df98-4b17-a0c9-e38f81e7da96',
                countryId: '83e1b81e-70a0-42dd-857b-02fe582dc51e',
                administrativeAreaLevel1Id: 'f9a0a41e-6768-4c3e-886b-013b0c82d472',
                code: '7c5vg867',
                customCode: 'i8uvimy8ds',
                name: 'Intelligent Rubber Chips',
                slug: 'et-minima-animi',
                latitude: 16946176202150792,
                longitude: 94342944877646670,
                zoom: 32,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '4eb33dfb-bd18-4685-844e-b050b5b100f0',
                countryId: 'fb3796c2-0484-4aaf-81de-97580c6126ca',
                administrativeAreaLevel1Id: 'b6b782e2-4145-4e00-ada6-f8d3d2273161',
                administrativeAreaLevel2Id: 'cf5dd1cb-6ab8-44ab-8ed4-06e1efe5f007',
                customCode: 'cbupbwsc1j',
                name: 'Rustic Frozen Mouse',
                slug: 'et-inventore-repellendus',
                latitude: 93959260331458260,
                longitude: 90401610864675440,
                zoom: 82,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '3dc47eb7-9a20-49b3-9bba-ebabf08448a0',
                countryId: '6c3d7912-57d4-45ee-a76e-edd24f6c96f9',
                administrativeAreaLevel1Id: '4a8e9219-a7f3-4fe5-bd6b-21c12279271e',
                administrativeAreaLevel2Id: 'bd74bf15-924d-408b-a760-24b935876b03',
                code: 'ey2cgs32',
                customCode: 'bamf7h3qj2',
                slug: 'odit-ut-nemo',
                latitude: 35729534016444396,
                longitude: 20706859128086490,
                zoom: 83,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'cfda82e7-1426-4d36-b790-2a20d1769942',
                countryId: 'e3d5a48c-05c7-4a55-8fcf-f463902ca921',
                administrativeAreaLevel1Id: '4a0fd674-6910-41d5-aa87-95fa2b866e96',
                administrativeAreaLevel2Id: '8f9ca187-d166-4c6a-9922-54aa3314d278',
                code: 'k5i333r8',
                customCode: 'yc4yfbq6g4',
                name: 'Unbranded Rubber Hat',
                latitude: 82656847357373070,
                longitude: 27192167707237096,
                zoom: 53,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'rlcbdacu5be7bqgvs054uojac8w0y1u93g0ss',
                countryId: '56959746-5af0-40b7-8277-5798d57fc125',
                administrativeAreaLevel1Id: '69151e41-9b69-4ceb-a682-c5cf59fba6a9',
                administrativeAreaLevel2Id: '77435532-8398-4703-9823-afae0df65f24',
                code: 'fmuzd0h7',
                customCode: 'wd7t8yqmlj',
                name: 'Intelligent Plastic Chicken',
                slug: 'provident-esse-quod',
                latitude: 95244858898005940,
                longitude: 24400915729324744,
                zoom: 31,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'eb13da18-b81c-46ce-96a9-83d22da60791',
                countryId: '5oo5w10wtdla6mn3uzkeyylbgk6e1d85ngdum',
                administrativeAreaLevel1Id: '03342696-de99-4282-8454-bde8f0f94e77',
                administrativeAreaLevel2Id: '9a559659-0cdb-456d-b0e8-d5934c96eeb1',
                code: 'n16c0tkx',
                customCode: 'c7ij0mn8wm',
                name: 'Incredible Concrete Cheese',
                slug: 'eos-voluptatem-corrupti',
                latitude: 66876646799205360,
                longitude: 58125729337643864,
                zoom: 87,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '7f618761-dc20-49ea-974f-6722c153444a',
                countryId: '113ce3d9-1e59-4bad-831b-2d902f752253',
                administrativeAreaLevel1Id: 'ld4hv3tkn3ggvs8xk6atb9nejir61w6laoki9',
                administrativeAreaLevel2Id: 'c39545a1-692a-43eb-8705-3da1eeba7fdd',
                code: '4p6izfr4',
                customCode: 'bdpak84fq9',
                name: 'Practical Steel Car',
                slug: 'consequatur-qui-quo',
                latitude: 29737264901891090,
                longitude: 20914251600043456,
                zoom: 54,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '9c4d5ee9-f8fd-4ce6-9144-4d60f599cf22',
                countryId: 'fd995725-a3a1-497b-af24-47e36803f35f',
                administrativeAreaLevel1Id: '4b0d8527-9f1f-4133-bcfb-c78cd5b8e385',
                administrativeAreaLevel2Id: 'z9gbev1bvq40nll0riz2xwgoy7ao6ccm6uage',
                code: 'g76gsmz2',
                customCode: 'on6bxnt0z1',
                name: 'Awesome Soft Bacon',
                slug: 'molestias-quae-earum',
                latitude: 17336479590726910,
                longitude: 93431704970807090,
                zoom: 26,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '86b6bdbd-3eee-4406-ba34-d277b86ef840',
                countryId: '169918c9-524e-42cb-abbe-6d7393776712',
                administrativeAreaLevel1Id: 'c63378a8-38a9-405b-ae82-1e73db7fdeaa',
                administrativeAreaLevel2Id: '2dd49d12-aea6-4d29-a992-1c3aa88af331',
                code: '23vfloft7',
                customCode: '1g4h21ttc4',
                name: 'Awesome Frozen Pants',
                slug: 'ipsam-eaque-praesentium',
                latitude: 71799548670995176,
                longitude: 27074102424838316,
                zoom: 81,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '773873ff-22c9-4a95-899e-bcbd6c3f7265',
                countryId: 'ffd8c655-2de7-49af-b823-08e48f1fa9ba',
                administrativeAreaLevel1Id: '6eb1558a-798f-426a-94ce-babae2e915ef',
                administrativeAreaLevel2Id: 'cd82991c-2937-4ebc-a99d-796f8b7b206f',
                code: 'j38akftj',
                customCode: 'poyyycfkt01',
                name: 'Ergonomic Wooden Bike',
                slug: 'et-rem-quos',
                latitude: 98568816262756080,
                longitude: 94625580095975090,
                zoom: 90,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '960bb235-96e6-4efb-b620-c34bc8af452f',
                countryId: '815fea92-7e02-4488-baec-c96e06482fa9',
                administrativeAreaLevel1Id: 'ecc170c9-20e7-47d8-a63f-18f55e4e9423',
                administrativeAreaLevel2Id: '8ac00830-789a-46fe-92a2-35ac4d7d90f3',
                code: '5r2cjg3e',
                customCode: 'xcyhh47xxn',
                name: '552gralylmjyxa6awmay3d05x9m5ssmaz6x7rm1rlssg9hugth3xjvb1q1dfpw1g96yfqic06ahuteqag13ejwq1vxscj62pb5p7vdmvfx2l40dfu8rfmpmgwszeg0yx6nlcul565gj1vcnbkjsnk592nnhxevmxcr7ezj8e10dhghibnj2woz9khltfw61zz3mkomdn0zsn5ykucod21abd0p13rmcvrvnvqkg5c01oj09e0ghxgdtqbxm53g3n',
                slug: 'dolores-sapiente-ducimus',
                latitude: 90617964814933630,
                longitude: 26372184327745070,
                zoom: 40,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '069018e0-e88a-4465-869a-2b846d73120f',
                countryId: '9a17dacf-6529-4422-ad4b-374d4edd6b6e',
                administrativeAreaLevel1Id: '4da87a0a-9281-4c5a-9ca1-236ba2d24819',
                administrativeAreaLevel2Id: '16f69978-1b65-4cff-9e31-99c694ffb3a0',
                code: 'k3kgq02a',
                customCode: 'mgmoginito',
                name: 'Ergonomic Rubber Shirt',
                slug: 'b9o5mzqdhmxwlesuwj2lcusqf9q4j3f106wkizdok6hvx2n4ukvkg4n74zzk66io537zx6dycshqbxwkqg4sladjrbe5lhc3xrvbnlm65mngsepnict5fvfv3w15nfeh1zmiorh3m50wn9lqey5xsxw9veic3lx657ttgwosdf6wxi54ooohebna9s6tkd5j5fbwn0ongb03zp49ds8qpn9ycipnjzegtad7ss6c3fw5g0xdgkxmch93m7p2rbgc',
                latitude: 18802051897699810,
                longitude: 85308485586985390,
                zoom: 83,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '028721bd-4c88-4faf-ba40-2032aa1e06a6',
                countryId: '70b0903b-5414-4f9a-b0b2-c134f42f3867',
                administrativeAreaLevel1Id: '9501c378-427d-42bc-810c-ac6fb3dc5fab',
                administrativeAreaLevel2Id: 'af2b1b7b-ff8e-4e72-bb39-bcb69252b335',
                code: '7y159bnn',
                customCode: 'np5bpt34vw',
                name: 'Licensed Granite Hat',
                slug: 'modi-velit-error',
                latitude: 540032855154815000,
                longitude: 70562573690670620,
                zoom: 61,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '0f7333b3-da31-4315-813a-a5c01553ed05',
                countryId: 'ec1f1d05-2c44-4648-9f2b-4691f27044fb',
                administrativeAreaLevel1Id: '3465873c-0114-43cc-b4ae-ddcc227aa5c6',
                administrativeAreaLevel2Id: '4b296bff-b14f-4f9b-83a8-27e74356292e',
                code: 'a2wrytzp',
                customCode: '9landaw5gt',
                name: 'Handmade Metal Soap',
                slug: 'sed-quasi-inventore',
                latitude: 58417925163249670,
                longitude: 974328243869358800,
                zoom: 57,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '9d383af9-6dcd-470d-bda8-2d8df8116022',
                countryId: 'a5920474-69f1-4f76-8a07-970e81c09fe2',
                administrativeAreaLevel1Id: '58e81a46-1d6b-4e8e-b4df-04d6a3fd0d58',
                administrativeAreaLevel2Id: '1887e7d3-0a2d-4b73-953a-d340ff9a8364',
                code: 'rldf3t7m',
                customCode: 'i4yaeuzaoc',
                name: 'Licensed Steel Tuna',
                slug: 'reiciendis-non-voluptas',
                latitude: 99419446633840210,
                longitude: 36149490857880510,
                zoom: 675,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'd59eb972-5347-4a7e-b414-babbea07e611',
                countryId: '2415fc0b-aa0b-4ed5-ad52-bbcbc066f08b',
                administrativeAreaLevel1Id: 'ef98db57-f9b7-4890-94cf-16339e57b099',
                administrativeAreaLevel2Id: '9c679d0f-25e4-4c01-b367-7547928fb9d7',
                code: 'yj7d8kki',
                customCode: 'nyyyjaylfx',
                name: 'Handcrafted Steel Car',
                slug: 'dolor-ut-ipsa',
                latitude: 37701593499913300,
                longitude: 87638827266711570,
                zoom: -9,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel3Zoom must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/administrative-area-level-3 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
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

    test('/REST:GET common/administrative-areas-level-3', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/administrative-area-level-3 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '959a14ce-9af2-479f-86d6-a71666dcf18c'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: '08067e62-f4c2-45ce-a643-cdc8f90cb1b6',
                administrativeAreaLevel1Id: '676a31ad-8690-4f6e-88d9-202e1036b4e8',
                administrativeAreaLevel2Id: '31ee41ba-5383-4027-a620-dcbec875e6af',
                code: 'rm9hmzt3',
                customCode: 's9vlstaiyf',
                name: 'Intelligent Granite Salad',
                slug: 'dolorem-quae-repellendus',
                latitude: 84382593995082770,
                longitude: 90300176463142180,
                zoom: 56,
            })
            .expect(201);
    });

    test('/REST:GET common/administrative-area-level-3', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-3')
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

    test('/REST:GET common/administrative-area-level-3/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-3/36e498fd-63a8-4202-a31b-5c6c0ac5457b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/administrative-area-level-3/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-3/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-3 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'fd48ca83-2a72-465d-8325-78f4ee01c027',
                countryId: 'bfffff68-9c42-4ec4-976d-89ca5520df28',
                administrativeAreaLevel1Id: '04cf486d-f3ef-4226-9a3c-5447dae49ed0',
                administrativeAreaLevel2Id: '0fda8129-90ec-4a70-b939-243e62d682e5',
                code: 'tfpjpthz',
                customCode: '1kdv38gngj',
                name: 'Rustic Metal Chair',
                slug: 'nulla-id-totam',
                latitude: 70382842055183650,
                longitude: 51331235509861620,
                zoom: 56,
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-3', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                administrativeAreaLevel1Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                administrativeAreaLevel2Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                code: 'b1sc1afs',
                customCode: 'ckszsxvmaz',
                name: 'Practical Soft Car',
                slug: 'adipisci-rerum-at',
                latitude: 78358845535185980,
                longitude: 72077624198104640,
                zoom: 16,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/administrative-area-level-3/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-3/1ab63766-16fd-4f76-9d33-e23f3ff94f4b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-3/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-3/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonPaginateAdministrativeAreasLevel3).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
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
                variables: {}
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel3.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        countryId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        administrativeAreaLevel1Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        administrativeAreaLevel2Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: 'l0j6c89s',
                        customCode: 'd0i9xzp0fz',
                        name: 'Sleek Rubber Car',
                        slug: 'ipsa-ratione-odit',
                        latitude: 43300300707385120,
                        longitude: 98667228457944980,
                        zoom: 64,
                    }
                }
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
                            id: '1f6b07e4-2161-4f38-b46f-a43447fb3b85'
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                    id: '68fd9dd0-bac7-484a-9e19-4d2e85f157f5'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel3ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel3 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel3Input!)
                    {
                        commonUpdateAdministrativeAreaLevel3 (payload:$payload)
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
                        id: '756080d4-5894-409a-927c-0b3344efc882',
                        countryId: '19ba3dbf-4d52-4d3f-973e-98dcbb00dc9a',
                        administrativeAreaLevel1Id: '36b3da22-2d0b-41aa-a325-98fb4d43d120',
                        administrativeAreaLevel2Id: '655391a5-d26d-4a67-9ba5-167cb7c2f76e',
                        code: '9glbvqmj',
                        customCode: '00dn1w1ff4',
                        name: 'Tasty Metal Salad',
                        slug: 'quae-neque-voluptatem',
                        latitude: 90774075473585490,
                        longitude: 77021845305251900,
                        zoom: 76,
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

    test('/GraphQL commonUpdateAdministrativeAreaLevel3', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel3Input!)
                    {
                        commonUpdateAdministrativeAreaLevel3 (payload:$payload)
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
                        administrativeAreaLevel2Id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: '1pyl13i4',
                        customCode: 'g75tnqx4ad',
                        name: 'Refined Steel Towels',
                        slug: 'optio-tenetur-voluptatem',
                        latitude: 28986630294710484,
                        longitude: 99514299779306270,
                        zoom: 15,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreaLevel3.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
                    id: '93a19f88-9dc2-43b2-afc2-5fc47271531d'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});