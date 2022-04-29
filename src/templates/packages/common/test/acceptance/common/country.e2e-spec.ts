/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '../../../src/@apps/common/country/domain/country.repository';
import { ICountryI18NRepository } from '../../../src/@apps/common/country/domain/country-i18n.repository';
import { AddI18NConstraintService } from 'aurora-ts-core';
import { MockCountrySeeder } from '../../../src/@apps/common/country/infrastructure/mock/mock-country.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let repository: ICountryRepository;
    let repositoryI18N: ICountryI18NRepository;
    let seeder: MockCountrySeeder;

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
                MockCountrySeeder,
            ]
        })
            .overrideProvider(AddI18NConstraintService)
            .useValue({
                main: () =>
                    ({
                        include: [{
                            association: 'countryI18N',
                            required   : true,
                            where      : { langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a' }
                        }]
                    })
            })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ICountryRepository>(ICountryRepository);
        repositoryI18N  = module.get<ICountryI18NRepository>(ICountryI18NRepository);
        seeder          = module.get<MockCountrySeeder>(MockCountrySeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource.filter((item, index, self) => index === self.findIndex(t => t.id.value === item.id.value)));
        await repositoryI18N.insert(seeder.collectionSource, { dataFactory: aggregate => aggregate.toI18nDTO() });

        await app.init();
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                iso3166Alpha2: '4l',
                iso3166Alpha3: 'xhm',
                iso3166Numeric: 'izj',
                customCode: '2wm76r7aqa',
                prefix: 'oe6xt',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 599403,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56770181610427260,
                longitude: 96063965550104620,
                zoom: 13,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Frozen Bike',
                slug: 'autem-omnis-blanditiis',
                administrativeAreaLevel1: 'hy7e0ohennvz222ele28xxvz447x7ml6o8t7r55bs6amxsqgoz',
                administrativeAreaLevel2: '4ovwb6xv8d1k62tz3mxm6fkjliodpz2lhmvjhr9mg1o06ihb14',
                administrativeAreaLevel3: 'k15ry4suz63oeld68mz29hk5qtiynjugw5ocskgina6j0fdqur',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '63dbe433-cfcf-47e7-b17e-e81a27fc4fc6',
                iso3166Alpha2: null,
                iso3166Alpha3: 'sng',
                iso3166Numeric: 'h9n',
                customCode: 'e6o6cf0lan',
                prefix: 'x9p4z',
                image: 'http://placeimg.com/640/480/sports',
                sort: 268430,
                administrativeAreas: { "foo" : "bar" },
                latitude: 57103116174477930,
                longitude: 60852346496668264,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Plastic Table',
                slug: 'delectus-sequi-sed',
                administrativeAreaLevel1: 'z22ho7eocnnqa24z6gx9l8xkydy26q890yrgne549pux8iz1l4',
                administrativeAreaLevel2: 'zkgyvc7xs1c5w1mvileplj8f9hp1cgq2s51yzb4a82u5qkc3ut',
                administrativeAreaLevel3: '7gwgk8cpbj1u9k154q6ja7r4awxmwje2hwjhzno0uxkdbksbar',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'e9ca6989-e4f9-48e5-9bb6-09f36a527d0e',
                iso3166Alpha2: 'me',
                iso3166Alpha3: null,
                iso3166Numeric: '3ao',
                customCode: 'kdr7fd5pyy',
                prefix: 'hon55',
                image: 'http://placeimg.com/640/480/nature',
                sort: 150350,
                administrativeAreas: { "foo" : "bar" },
                latitude: 45393518801795280,
                longitude: 12241430066436636,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Concrete Salad',
                slug: 'sunt-distinctio-quia',
                administrativeAreaLevel1: '7tek9was78vdgxz1lsqyel1umvnj7twffpqtculuyamlx481ut',
                administrativeAreaLevel2: 'fd7dxst3tmxc48l7ipl2iy9kpey5kw83hta61sgbqflw5rpfvu',
                administrativeAreaLevel3: 'vvnugze7u7rh0ag1cm8jzizh5wcjo5goyy0d3fojqdzxjm1lne',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '7995f9fd-39e3-4ca0-8950-26e56ad09391',
                iso3166Alpha2: '3d',
                iso3166Alpha3: 'a8k',
                iso3166Numeric: null,
                customCode: 'zhc1444bmv',
                prefix: 'sfnus',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 399662,
                administrativeAreas: { "foo" : "bar" },
                latitude: 79830130861492770,
                longitude: 86494383338566510,
                zoom: 38,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Wooden Gloves',
                slug: 'molestiae-labore-asperiores',
                administrativeAreaLevel1: '51iz9cc68oebq5k1qfj257ahyeiwem97aziqcnapsh9uuqmnya',
                administrativeAreaLevel2: 'y3j2ppynxxk4e3oh5efgt02dbqnzgjm69z9azb7ykfs42ocfdm',
                administrativeAreaLevel3: '528dpl7fdab25jcdrwpai0xdz2jvl6eyzngfendj84noqyfsd4',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '9d9412cc-1d1c-441d-b6f2-00d538978cba',
                iso3166Alpha2: 'jy',
                iso3166Alpha3: '5ju',
                iso3166Numeric: 'yp3',
                customCode: 'u115rgsl4b',
                prefix: 'lxxsw',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 200870,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52959839042920360,
                longitude: 32356709398940348,
                zoom: 20,
                langId: null,
                name: 'Incredible Concrete Chicken',
                slug: 'est-necessitatibus-libero',
                administrativeAreaLevel1: '37ohkd24ub12io0sjoxcyr1t5ogwld79irae05zdqdcpuzz2ng',
                administrativeAreaLevel2: 'f2sulp0rh0myiymrvwux743gwknlrcdeq0rmypmkwsz46z5yxz',
                administrativeAreaLevel3: 'qdkk2kcvmwy13ivcsrupja17o0srskkx4jj0in7pyzfbme4rl4',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'f99c34ed-1d20-43db-a7ef-387ed9e2df6d',
                iso3166Alpha2: 'ma',
                iso3166Alpha3: '2vd',
                iso3166Numeric: 'vs1',
                customCode: '0ud7ylf5e4',
                prefix: 'szacd',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 112718,
                administrativeAreas: { "foo" : "bar" },
                latitude: 46844608927477930,
                longitude: 66732720259832720,
                zoom: 79,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'beatae-repellat-et',
                administrativeAreaLevel1: '0g8vx06vxa6vo17kr4wknsp7mk92c7v7y9y236a4m681unjnpd',
                administrativeAreaLevel2: '8ur2sj09lqjws7bliexb3wz3a5snm1jbne0sb7vzyphp6l2lmu',
                administrativeAreaLevel3: 'fqqwo2jongv8und23rmx7ks7zx6agbmnnt4cexap3grv1yfs6t',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'dc2d63aa-3d4e-4ad4-b129-0bb118f833b2',
                iso3166Alpha2: 'fx',
                iso3166Alpha3: 'uco',
                iso3166Numeric: 'te8',
                customCode: '19dbcezn82',
                prefix: 'd0cfu',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 615364,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26180409518228052,
                longitude: 59787466198030824,
                zoom: 31,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Plastic Tuna',
                slug: null,
                administrativeAreaLevel1: 'vmh3r9ggxpq9gv8ia6ztihng8p637rne5f3oxwwx61tw9jzdsy',
                administrativeAreaLevel2: 'd6yw1u3kpro2bn14d96tdlj2wq8zbmjjnt7shxpu5iahbte1b8',
                administrativeAreaLevel3: 'nym1w6pvtextl5wi91t638b59xszt11knl6b3dhsvp9m8l0w6x',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                iso3166Alpha2: 'm3',
                iso3166Alpha3: 'v7h',
                iso3166Numeric: '5t5',
                customCode: 'bjn530pjma',
                prefix: 'p2kgm',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 319202,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85418877068607840,
                longitude: 65985474842110536,
                zoom: 47,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Concrete Shirt',
                slug: 'rerum-magnam-voluptatem',
                administrativeAreaLevel1: '434qhenl6qb3yvwtw5eg6q28r9m9sdmciriyol92ia5eyxjvd3',
                administrativeAreaLevel2: 'sa536qe6yxtniy05dx3xohtbf4ngp0qggqmpqv4vxvi205tlr1',
                administrativeAreaLevel3: 'cayrz6tie8yrs5rzf9y2keqnjdxc0sbytldqgxyghxhc0xgohz',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'ef16fe09-dad9-4880-9f25-ac94283aff90',
                iso3166Alpha3: 'ebr',
                iso3166Numeric: 'tlu',
                customCode: 'dwxeo1kb3r',
                prefix: 'ew6fo',
                image: 'http://placeimg.com/640/480/technics',
                sort: 766745,
                administrativeAreas: { "foo" : "bar" },
                latitude: 16658356122477260,
                longitude: 14095031975527214,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Metal Pizza',
                slug: 'similique-dolor-commodi',
                administrativeAreaLevel1: 'q1r4sled9gvqoxgsgrah2adyoxczhhrn30hl920ftz9odk1tem',
                administrativeAreaLevel2: 'w3ch86v2t8aozhvg1tooi36urkvff1ktb174smg4hsk2g934jq',
                administrativeAreaLevel3: '8nhf6gfjqs82ft8uggfxg5xw0l1p9l85l3qfsfyyu95aw9yy70',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '4e2e6286-1467-4d55-9181-0bc2c9b3f834',
                iso3166Alpha2: 'xj',
                iso3166Numeric: 'lwo',
                customCode: '3h4i9bdbnl',
                prefix: 'xuiby',
                image: 'http://placeimg.com/640/480/technics',
                sort: 519606,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85657014523874270,
                longitude: 26221694949581830,
                zoom: 26,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Concrete Hat',
                slug: 'vel-facere-consequatur',
                administrativeAreaLevel1: '2kywj236vvqxeamkq6gt3tdd7yetebbfut69m89kwka1srpn23',
                administrativeAreaLevel2: 'wa6p7nwfl2k1moseqkzgppjut3skb4bt0ccztrvhoez0y0nr2q',
                administrativeAreaLevel3: 'aayek7ewvmpczobb66enp6by8savmr1yw1goude8jv87jyblpj',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'ab30ab6b-e33d-4c7c-82c7-2d54061e9604',
                iso3166Alpha2: 'ji',
                iso3166Alpha3: 'jbc',
                customCode: 'chwildvs0w',
                prefix: 'vzx4u',
                image: 'http://placeimg.com/640/480/technics',
                sort: 176407,
                administrativeAreas: { "foo" : "bar" },
                latitude: 81427987149187170,
                longitude: 22484996196482536,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Fresh Fish',
                slug: 'consectetur-necessitatibus-inventore',
                administrativeAreaLevel1: 'tcsyvrf40dfod6wcj0n641pb9xrejzffv0xf3nd9hh325du04f',
                administrativeAreaLevel2: '7mwt0bn8sqo0nnj5vxk7h42w8enahyk6qjxwszsvjwfqcyjv8f',
                administrativeAreaLevel3: 'qnz91q61xhoy1n9p1l6ow5q9bkscqlmcmkry3irpx86qxe1fpz',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '95819d38-65a1-491b-afe9-52ad00350c20',
                iso3166Alpha2: 'g9',
                iso3166Alpha3: '9w1',
                iso3166Numeric: 'fj1',
                customCode: 'yx3y8lj8fx',
                prefix: '0vwe7',
                image: 'http://placeimg.com/640/480/food',
                sort: 154084,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43827881657039340,
                longitude: 58375204935993660,
                zoom: 21,
                name: 'Tasty Steel Mouse',
                slug: 'illo-qui-optio',
                administrativeAreaLevel1: 'kk07x7jpb147exsrcesjv1a1qcbsow19kx9zt3b40taf3davqj',
                administrativeAreaLevel2: 'jjhaubcdf1gxm37wjzkbqoi5nq26uxau4das268xmo49rc1alx',
                administrativeAreaLevel3: '2c236kwyyarkfo5yd7ygsdx4grr201r3ahkux1god7p14twrul',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'aabbd5b9-9af4-4b11-aae3-bcb9631e82e7',
                iso3166Alpha2: 'es',
                iso3166Alpha3: 'hpa',
                iso3166Numeric: 'q30',
                customCode: 'rrx3dmqz56',
                prefix: 'jz0oz',
                image: 'http://placeimg.com/640/480/nature',
                sort: 403275,
                administrativeAreas: { "foo" : "bar" },
                latitude: 51201595184549940,
                longitude: 94331449498971680,
                zoom: 60,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'maiores-velit-et',
                administrativeAreaLevel1: 'dtcco8zjoowba5vxdmddhgk41ilhkh6tgfmovo0pxkx68mper5',
                administrativeAreaLevel2: 'lz9xelumy4tjrmheba9oe34zg7eph9sbpi2tiysbfg5qk2k9s5',
                administrativeAreaLevel3: '8q7puv5hz2fqu3qrkzdy8lwid7bf6wyrsqseo18edrobladrkf',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eed9a843-7932-4bf1-8a59-2d097e66b7ee',
                iso3166Alpha2: 'ou',
                iso3166Alpha3: 'dwm',
                iso3166Numeric: 'rcq',
                customCode: 'czh3juj8ls',
                prefix: 'l718m',
                image: 'http://placeimg.com/640/480/city',
                sort: 507562,
                administrativeAreas: { "foo" : "bar" },
                latitude: 97684588630588560,
                longitude: 40954857351307256,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Concrete Towels',
                administrativeAreaLevel1: 'rkole69ad1wdd8h9fbdehzbxtvc7ggldklzu0ic3l51k72wo1l',
                administrativeAreaLevel2: 'nl8lru1ezqpv7646etcr3qhki3b2tpur3he7cqhwr8e6cp6za8',
                administrativeAreaLevel3: 'cpo1qp0vr56ar2pzs2pvlww7nzka625hhhykl5x358nbgr9wzz',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'uujd5b7xwzrkrqcg63xscfbp6esuhp0yu2pk8',
                iso3166Alpha2: '1a',
                iso3166Alpha3: '6w7',
                iso3166Numeric: 'bh5',
                customCode: 'pg184u1fuj',
                prefix: '0brjz',
                image: 'http://placeimg.com/640/480/transport',
                sort: 609237,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66644876831448270,
                longitude: 89805951607386830,
                zoom: 65,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Steel Pizza',
                slug: 'quo-ullam-animi',
                administrativeAreaLevel1: '7iltidf8fgq723mrzupoa2qjvlif9d75d48eh5kemny7iod2gh',
                administrativeAreaLevel2: 'ljxvbpg0enqrg3fu2q65trj9qlym4y4b5zgx332qe3ujurmy69',
                administrativeAreaLevel3: 'kh3kvzuspolh9hodpprp3sp8cdwcjdxv62ishmsfrct3z73vdl',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b330e19a-f5fb-4c3c-a91a-93a7be1221a2',
                iso3166Alpha2: 'i5u',
                iso3166Alpha3: '8sy',
                iso3166Numeric: 'opa',
                customCode: '5hmeaq131l',
                prefix: '8lt81',
                image: 'http://placeimg.com/640/480/food',
                sort: 204556,
                administrativeAreas: { "foo" : "bar" },
                latitude: 20070929065269620,
                longitude: 19013575159912310,
                zoom: 24,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Concrete Computer',
                slug: 'nam-in-qui',
                administrativeAreaLevel1: 'anqymbgvgm66cxit19nj3kusm90r7ni97p3s34prhyefq00rtc',
                administrativeAreaLevel2: '94v7f0k250lu8h93njf7lqnb0o9io5bmvflp6253cg3myf8ms4',
                administrativeAreaLevel3: 't0rsbqadb6xga8rvx07zilkd0s4on4v23wou38gkoli0l7jyoc',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '8196797b-a95c-4962-a6bd-b52ac3fc3827',
                iso3166Alpha2: '0w',
                iso3166Alpha3: 'lyeb',
                iso3166Numeric: 'mjx',
                customCode: 'h4j55wsxmh',
                prefix: 'hw3ex',
                image: 'http://placeimg.com/640/480/sports',
                sort: 483520,
                administrativeAreas: { "foo" : "bar" },
                latitude: 59597743877050136,
                longitude: 12628649638256260,
                zoom: 26,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Plastic Car',
                slug: 'et-dolores-et',
                administrativeAreaLevel1: 'czmlg2t6j8q6h9eyghqncq1w5ymyhwqbroa81m8cpog22y8jmx',
                administrativeAreaLevel2: '2v6rlnf4xyp6sddgbrpfkx9er6qj3lsrk5fgky3qydj5avjkz9',
                administrativeAreaLevel3: 'fhbpoak35a5n5hnb1r2eljisvbc0gzrtwmwbf59mytn9lhwk8l',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c900a87f-8040-457f-ba29-bb8d79cbe121',
                iso3166Alpha2: 'vf',
                iso3166Alpha3: '6ph',
                iso3166Numeric: 'i7ea',
                customCode: '8ps6u9xmuz',
                prefix: '5ne8d',
                image: 'http://placeimg.com/640/480/business',
                sort: 572153,
                administrativeAreas: { "foo" : "bar" },
                latitude: 88831606582888220,
                longitude: 58373510164207510,
                zoom: 84,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Steel Pants',
                slug: 'ducimus-dolore-veniam',
                administrativeAreaLevel1: 'amhapff3coemwjkunt7fbwwjessmmlab9c2f00b17m7o2qb5cc',
                administrativeAreaLevel2: 'rn30gt3o89xytp30zm6kihf1366rdxkauo4tyr0lmng4etmipd',
                administrativeAreaLevel3: 'tbqg15r9ate7ikqqylxjjzqwz4bzkunl4mg7l7c9vt3p3pih26',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '9f468f07-ab6a-405c-848f-3135e5bbaee1',
                iso3166Alpha2: 'xg',
                iso3166Alpha3: 'rrn',
                iso3166Numeric: 'd9o',
                customCode: '8ezchzk7yx',
                prefix: 'fcbey',
                image: 'http://placeimg.com/640/480/cats',
                sort: 872321,
                administrativeAreas: { "foo" : "bar" },
                latitude: 21931089922076190,
                longitude: 80554491032333920,
                zoom: 67,
                langId: '2ksk2wcq5holhbnizoooxlfac1fi97f9pnjaa',
                name: 'Gorgeous Rubber Chicken',
                slug: 'inventore-nihil-non',
                administrativeAreaLevel1: 'gof3mxm2vq0so8ckdm3cusa0zr4fpq448kr2yzbsnl2hi7pj04',
                administrativeAreaLevel2: 'k4uy656j1q9oe9ioyanmj7kb37usgkry8wmlf6idc2kwgow5dn',
                administrativeAreaLevel3: '4eti1xdzker316ghodjkm50dz4aul52p2lpiplvp6rycorl7zh',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a916b32d-6449-4c8a-8b0d-e00058d319c2',
                iso3166Alpha2: 'bb',
                iso3166Alpha3: '8ao',
                iso3166Numeric: '5m9',
                customCode: 'hhn5wc6564v',
                prefix: 'ras87',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 106709,
                administrativeAreas: { "foo" : "bar" },
                latitude: 76887373900812700,
                longitude: 88929733450244930,
                zoom: 32,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Soft Hat',
                slug: 'et-deserunt-rerum',
                administrativeAreaLevel1: 'fvzhflboystv71crc272ppqpt9jfjtded7eyghdhx5oxcen0wk',
                administrativeAreaLevel2: 'dvgqftwwmjwf86nnvia6jxzhvb4zr2ly2f6ii7euxe7zik5wqv',
                administrativeAreaLevel3: 'wpxj1f7jvycod9kqq55nesry6xgbsxr4end884k4oa2y08er6o',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '06571d1f-6100-470c-ac94-19a132181ab0',
                iso3166Alpha2: 'z6',
                iso3166Alpha3: '92d',
                iso3166Numeric: '7c8',
                customCode: 'spi3fg4lrq',
                prefix: 'h003lf',
                image: 'http://placeimg.com/640/480/nature',
                sort: 960472,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94218146008112060,
                longitude: 39890733662024610,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Metal Gloves',
                slug: 'fugiat-est-suscipit',
                administrativeAreaLevel1: '054tuzogyzk5t2m3wywedymyuhyq499n7bxrf8r8bzzyo9163x',
                administrativeAreaLevel2: '36jgc5mk9mbrnzr1gv87nq8a5zyw56oiv0tfnvootu5j82teqk',
                administrativeAreaLevel3: 'vrn2fzklw4npcuptin0g4jbia1vqb3n0p4lp9fa2wk4zoqq11y',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '551b0104-b5e0-43d6-aac8-a882e4ed541f',
                iso3166Alpha2: '0p',
                iso3166Alpha3: '7fd',
                iso3166Numeric: 't6d',
                customCode: '9rucvfqc1a',
                prefix: 'mbirp',
                image: 'zp7bszqartusply9jbg6ml1vawzakescsrwnwcemm60c46pestsinlwy2nxgjk9dhxzmpn0ls8o0385ma376hclv31gj7mqe2plyi1nskezv61wd8ksmo04y7i01lnvnoz912ftlmyha4bdnijfvrv1uau4744v6zpf25rqhauinh2eyrxmhoukxme33nrggctk9j04ursxzqtyf6wj74x2v4jhv76zyv22ufbq7k40rhbz2wjxlwjw7u1rl4oqoznm44g9zvfgv5wkcqxhgm1dx5nqehbod8cyyz28dta1ec12bgrmkwgqlj94jzs59obyp9nuukfsn63wt7bdaqwe7fd5q82mpqy9ig9aq5h9r9n0f5ssxgh2gpj86yo6n9yunj34aufrfpsidogteekh3k35axyuc7oywub27wjngx1gf4ge5fqfmo5to0mz5zls3l6la71pjy2ykz1uye1od0tevkacikea6d8k3ndl7d4rdkoo48kycs0nnvjcs7fv1vom5ao7tsg2g6oxp0susi6l3r9z52yk3kojlkixcomp6qzjg54hql3h0wkz2rr53ijlcecd2joel3m9xu1sysm3qwg1t6i1vqymildx8kn6w2wunahzq1m7fy8pt1omw5v7q8xn7i2bos37wukhilvi7nlskz6gkt6nlo7yas1878lxhe88sj547c5nhe3ivgsidwqojh8k4rxzs79fwiiclbfza9fpe78ubuotmyx9qbgejpxf0f9wto2vkrjxo0bjmfzp77t4gmanr6ro5gbj3jzmyeeqitqwdr550m5waq336x95qjz105tle5y60jn2f4rxkadivp61fy3c8qnyqv0zo2c83psaz28xgc5y3y4nwmzue2yo8yc0g8dc9yhs3at22z9uydzepgigmx5dxvozyn1u1ropt3mnmuk4n5b39w4j5fgaegr4ouyasfjefi2sjmp6f0f3tkeobyor4cu0v4tk61ytij73cnp8e3pyo5itk95tf7pevr',
                sort: 827756,
                administrativeAreas: { "foo" : "bar" },
                latitude: 62241275420968584,
                longitude: 82015719792333020,
                zoom: 26,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Wooden Pizza',
                slug: 'quia-ut-et',
                administrativeAreaLevel1: 'bkrxuisf68yg5o2h8lhamgi1iunvo81j071j9nxr2ltwjkl225',
                administrativeAreaLevel2: 'fxull7mma2kh1vcd7s9afrn3q3r6u1h4b14kmgxbi4gb50twra',
                administrativeAreaLevel3: 'soswjardhxixr5akzaezb1eb3b6uvoaplp3w01d8pqjq2ap3vm',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '6a7a405b-2eaa-41c2-a367-fd36a1981f97',
                iso3166Alpha2: '9f',
                iso3166Alpha3: 'cjl',
                iso3166Numeric: 'zf4',
                customCode: 'sxm76qkuyc',
                prefix: 'dwtwx',
                image: 'http://placeimg.com/640/480/cats',
                sort: 5232042,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63939650488343620,
                longitude: 57840871447249040,
                zoom: 97,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Soft Tuna',
                slug: 'ut-aspernatur-doloremque',
                administrativeAreaLevel1: '81i2jttcmh57gj9k9cgangejfrtcquc1hzty5w0d49vdltpvc4',
                administrativeAreaLevel2: '05otnmzzqrk2vkg8sduudc0b2o6t0iorp8oilgtqv9600w0t95',
                administrativeAreaLevel3: 'bi6gzcvsbfgqgtqpyn9thwohqcm7pk77ejokmb9mp3jj0wiid2',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'ef1efb6e-30f8-4031-8fb3-983d7aeedfd8',
                iso3166Alpha2: 'r9',
                iso3166Alpha3: 'te3',
                iso3166Numeric: '1ji',
                customCode: 'jbdzjmbbqj',
                prefix: 'ghv0h',
                image: 'http://placeimg.com/640/480/nature',
                sort: 561361,
                administrativeAreas: { "foo" : "bar" },
                latitude: 200043972056137920,
                longitude: 74786442961908560,
                zoom: 89,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Frozen Sausages',
                slug: 'eligendi-omnis-earum',
                administrativeAreaLevel1: '7yfb1iannmpnmtimm3vqn807gpep7sov52svvxhmvsk5sj2634',
                administrativeAreaLevel2: '7vfxl99ou8ly7xwbqaz21yu49fa0h8vgng9jof0walaobkz5cl',
                administrativeAreaLevel3: '5wrgqunv1tod2hocxhgdavw6htkf6ttmdf8tcqnz5ds4i7hko1',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '2ca71234-bb2d-4e4f-adb5-05a12a3c2ebb',
                iso3166Alpha2: '9a',
                iso3166Alpha3: '7pl',
                iso3166Numeric: '9m3',
                customCode: '4hisztzpz6',
                prefix: '1jsyy',
                image: 'http://placeimg.com/640/480/cats',
                sort: 448065,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73944208457374290,
                longitude: 420802879089600260,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Soft Chicken',
                slug: 'mollitia-voluptas-optio',
                administrativeAreaLevel1: '9xncjwswwui1lfp61ebwii15gfkkx6vhwsqpenwib9h8643mky',
                administrativeAreaLevel2: 'swzop1b6n489gfa9du5ksgrzqf2cripncekw4d9xji6i9qt0d8',
                administrativeAreaLevel3: 'istshtdy9zldc1jo797hq09wd9fymtjyjn2b513uzy0r9r21wf',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'ad34482b-339f-4845-980d-800333aed5fb',
                iso3166Alpha2: 'sm',
                iso3166Alpha3: 'zoj',
                iso3166Numeric: 'o4q',
                customCode: '6zlm6ps9h7',
                prefix: 'eqdom',
                image: 'http://placeimg.com/640/480/people',
                sort: 878381,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93046912177422620,
                longitude: 98560563476941040,
                zoom: 677,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Soft Chicken',
                slug: 'nulla-qui-modi',
                administrativeAreaLevel1: 'buyhoexfvl9bu8yhn3gtz8c7gel0ktvdy030okxoxwmbsic9y7',
                administrativeAreaLevel2: 'hd2r21gd4tq7utapkxvjeepwo8c3jrbifp9k9is51u1qynjymq',
                administrativeAreaLevel3: 'znkxnus0uirqank2dry8quzywvrf0ujloygkq2g0v61v6boc8l',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '32cda641-05bb-44d3-8cda-0e75bb4d7355',
                iso3166Alpha2: 'gz',
                iso3166Alpha3: '1z4',
                iso3166Numeric: 'i4w',
                customCode: 'qp2pnv9ye9',
                prefix: 'pbt75',
                image: 'http://placeimg.com/640/480/food',
                sort: 371660,
                administrativeAreas: { "foo" : "bar" },
                latitude: 88142278128764480,
                longitude: 27492193844247800,
                zoom: 96,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Wooden Salad',
                slug: 'kedn2o19p8usplmxytm3y13zm076ihe2su57gjojb925izhl7657enmybzsmhvpoguwy6gea28irnmh5od2nbb1que9wkkxdl2e8yvxxonkghdpx15667uwxs8osric2zqn0rzv6fpmq40wbyalbnkeu88hu71kzb8y3p2hubq0a0pu3jttylq2p62of8uu80gt4tqnlfrh8dcan3g913wpgsa5628r3xdi825arlf1gntkwucc6hry5jvkwonvyute49ffykfozi8w50u2k5jwv5ntq0uo6yjdjpbbujfd8atmt9tqny2fkb2j3qrl3u71ls3bme5mgn6lyl66x806ss45tqwwoivqs4vsuqhq8w04cvxuwzw9ivt1huobz6tlc9f1hkxpk26vooe9i43d3pbjkg4ayy5j4fd215vyphue7skszs0r6pl4ipr5f4yda23wlzykgt60zi7iwir099w8eo2ygdumc1runw3cqo8qeppbpifjkcauwrwnogr7kdj6cp63r03rs8dj88qhtq6vnljkquarvyw0z1kqx7fkuw6srgna1zmebq0we4cv4ndy96313h3dbggxmo58fmnrfvuxvnl6qga5320r8ao764uobh39kab65pl3h53jft8ftg7cwgkl09a0ymik33jrh0oc63ymc3utv2u9qu9m3u5l1a4oke02pjp3uahep8y9lq93ebcshpceydy21o4p9i8mi1929xjig4rx4ig5g8yaz9wvmhnh3ux5ezp2b623ykh4kca6j6wzdq280dwn83eu9jon5p5auh4dfijx8eao2yq35kzekytkk5ctilwadbzyrxbehsh99nwxve9qb3gbnpbh9sq42m7rvi1v11m7h83kldpb64zt3qnu867xlzk89tvqj6pmw5b32kqwy8u8ld5aoytbr3kyx3uof0uzbevotkvm2ivr4cxwedg1phh6cgy65hi99lhe1ovybef7vkl32dwkkb1tkfgv5obuy2asn0qhnk3fan',
                administrativeAreaLevel1: 'x5qiephgr9ecrlbazqj70w293zoq2mmey7q8h10y7m0936fgdn',
                administrativeAreaLevel2: 'oxa94ograkr4r0qosxm1qc4n0i811vz5gljzz020wb265bpuwp',
                administrativeAreaLevel3: 'dpyqthm3h4tgexuz3mfhr4p3cnqg72kszd7xy2oa9qeqqtqf8c',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '9f16178f-4cde-4e9a-9288-4917d5730075',
                iso3166Alpha2: 'eb',
                iso3166Alpha3: 'h83',
                iso3166Numeric: 'bg3',
                customCode: 'u4kfhysk9r',
                prefix: 'm1i3d',
                image: 'http://placeimg.com/640/480/sports',
                sort: 824990,
                administrativeAreas: { "foo" : "bar" },
                latitude: 90771579470533200,
                longitude: 46425656897630770,
                zoom: 70,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Rubber Mouse',
                slug: 'quia-saepe-odit',
                administrativeAreaLevel1: 'dcsasslylk7af70chwsimw7wch9scb0f18z8dayz5eobxphaeee',
                administrativeAreaLevel2: 'uuz86ngsm3nlrwkccnroh8db57ljzho3woq9x43ghd2m5pq9qh',
                administrativeAreaLevel3: 'sxlau1v8opf22vdp8xelddprbss1hzyfsvfvsu4txwbzknxz3n',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '20cd3826-f28c-4ee9-9cf0-0fe79a874852',
                iso3166Alpha2: 'cx',
                iso3166Alpha3: 'pav',
                iso3166Numeric: '6wf',
                customCode: 'q3atfr2x4r',
                prefix: 'brks7',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 610898,
                administrativeAreas: { "foo" : "bar" },
                latitude: 78839473649250780,
                longitude: 45744256902264270,
                zoom: 69,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Wooden Pizza',
                slug: 'aspernatur-dolores-non',
                administrativeAreaLevel1: 'dbgo4sbq0k6i9vid084x8jc4vz950pz89lsak7vtvxyuhost3c',
                administrativeAreaLevel2: 'qgd1g6km8wr78ah58glyt9vts3z2wm8i4zun123s1fbv97ku0gp',
                administrativeAreaLevel3: 'y8o8gocquw8xyo9agc1ws39uou3e4i85p60lyme3lk51162b8i',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '49de93c1-74da-4c82-a6b5-18b518404c0c',
                iso3166Alpha2: 'yb',
                iso3166Alpha3: 'zuo',
                iso3166Numeric: 'hrf',
                customCode: 'bihmzlxa7f',
                prefix: 'bzpym',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 455070,
                administrativeAreas: { "foo" : "bar" },
                latitude: 45847591084757730,
                longitude: 60938899672200610,
                zoom: 82,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Wooden Pizza',
                slug: 'nisi-sit-et',
                administrativeAreaLevel1: 'k8aeqdcxxevhotl9df06jncmlghjlw99ni8dqvaw7o7fq9dthk',
                administrativeAreaLevel2: 'l9b6lvfqpq6ieo4i8j6asjhppj4tjbvh78v62gmgm6la8oxdxf',
                administrativeAreaLevel3: 'ximrayqk7xpb5necnrv9rr0qzz72xqzfhx48c3meosw1xy8laf1',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '18ff7148-0fac-4af0-9748-5a8babca8d57',
                iso3166Alpha2: 'ht',
                iso3166Alpha3: 'gdc',
                iso3166Numeric: '1rn',
                customCode: '67hr5r4pja',
                prefix: 'i8um5',
                image: 'http://placeimg.com/640/480/animals',
                sort: 180426,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94262381592871060,
                longitude: 44272479236784920,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Soft Bike',
                slug: 'et-sit-dolor',
                administrativeAreaLevel1: '2aelqjppzg232n4o4q2b27ibyh1577dfhf6184n8d55p05081w',
                administrativeAreaLevel2: '4pmk7o1nud33tde4vuzkjj3k7kaxjwaein00nw1ib1zenrtjtb',
                administrativeAreaLevel3: 'azuuo94hdqqivzccrsdg6jmfvwdnoo6gxx24hlpojlsyw51jgr',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/country - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
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
                    limit: 5
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET common/countries', () =>
    {
        return request(app.getHttpServer())
            .get('/common/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/country - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '91f3d133-c0e6-4fd5-b44b-2f2da344acc8'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/country', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                iso3166Alpha2: 'ce',
                iso3166Alpha3: 'kf9',
                iso3166Numeric: 'el9',
                customCode: 'nkhcawoj7l',
                prefix: 'azx9r',
                image: 'http://placeimg.com/640/480/animals',
                sort: 851454,
                administrativeAreas: { "foo" : "bar" },
                latitude: 65163331523269470,
                longitude: 87367853221824370,
                zoom: 33,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Steel Gloves',
                slug: 'ducimus-quibusdam-at',
                administrativeAreaLevel1: 'mmzpm5ox7e4a1hrwxuktwt0sjk2p0tojqmjqe8qa0z49h9ztpw',
                administrativeAreaLevel2: 'xiiyrbwlpfaxgxh7k41hnr4h6croxs6m5iipuxqixy66a2ow4x',
                administrativeAreaLevel3: '5m1swiwoufinb6m7pruej3w8ycq7zjhbfcfphe8n36aorakxbt',
            })
            .expect(201);
    });

    test('/REST:GET common/country', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country')
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

    test('/REST:GET common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/87be5480-9cbe-4665-a567-4761d847508c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/country/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/country - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '4160cc92-ac98-4bb6-8967-66a0a6f0db00',
                iso3166Alpha2: 'sn',
                iso3166Alpha3: '97g',
                iso3166Numeric: '57z',
                customCode: '01y1tkerr5',
                prefix: '5bbf6',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 111895,
                administrativeAreas: { "foo" : "bar" },
                latitude: 28126448369677668,
                longitude: 16210752928292668,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Chair',
                slug: 'a-esse-ea',
                administrativeAreaLevel1: 'bpsn6gcq8ykuew8wo2di6gnko2n8o2iw6kod92iqzo9sig6vvo',
                administrativeAreaLevel2: '6b3octdk0jm20tqzxoskn9gmx459eo8e0vayrjfqz2gwnjxh85',
                administrativeAreaLevel3: 'hiuk65t74fsdr2e7eqi43wtinuu1oadfow9rpblpwln12cq36b',
            })
            .expect(404);
    });

    test('/REST:PUT common/country', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                iso3166Alpha2: '2m',
                iso3166Alpha3: 'eij',
                iso3166Numeric: '5d1',
                customCode: 'k8dtg6dz6m',
                prefix: 'i0vo0',
                image: 'http://placeimg.com/640/480/people',
                sort: 659808,
                administrativeAreas: { "foo" : "bar" },
                latitude: 54353919029397960,
                longitude: 44687437572184730,
                zoom: 19,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Frozen Soap',
                slug: 'corrupti-rerum-eaque',
                administrativeAreaLevel1: '7so696u781gmm8phoqy97kn5u5b306xoh7058svfyg7epk0esk',
                administrativeAreaLevel2: 'gdhic5c7vdxl7hxcrr7m5msxk1v7rzihg5wwcymmoheg94p12m',
                administrativeAreaLevel3: '379cnkyguuxer0wbh9rwd9c3p58iml1rvoxuzzxm4we8o9gquj',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/ff5494e3-b2e9-47f9-9853-37ce1402129b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/country/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonPaginateCountries).toEqual({
                    total: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
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
                            dataLang
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
                variables: {}
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.commonGetCountries.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        iso3166Alpha2: 'zq',
                        iso3166Alpha3: 'dov',
                        iso3166Numeric: 'pxv',
                        customCode: '2f2xsdidv6',
                        prefix: '5j5q5',
                        image: 'http://placeimg.com/640/480/animals',
                        sort: 299653,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 86912257394114050,
                        longitude: 69254334711710560,
                        zoom: 25,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Licensed Wooden Mouse',
                        slug: 'iure-cum-explicabo',
                        administrativeAreaLevel1: 'd75nnffhiefz5colk2n09626wdsxtnx0xd5lxx0kiodx85im0q',
                        administrativeAreaLevel2: '35h0fkz29wonstqqzlw5srel0sk025h2cs7z7qpus33msic7mo',
                        administrativeAreaLevel3: '6h7agmfhmboq0ph5aixm3a627p00umfrtvybh8xxz8caektqio',
                    }
                }
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
                            dataLang
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
                            id: 'bab717a8-cb0c-46b7-a6ce-a99833f7290e'
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
                            dataLang
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                            dataLang
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
                    id: '6f3a6aee-a86e-4337-aa7d-e3d1aef7d97a'
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
                            dataLang
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateCountry - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryInput!)
                    {
                        commonUpdateCountry (payload:$payload)
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
                            dataLang
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
                        id: '91edee31-94a0-4ddd-a9c2-78b33150e5a3',
                        iso3166Alpha2: 'ay',
                        iso3166Alpha3: 'bgc',
                        iso3166Numeric: 'xsy',
                        customCode: 'x4wi1xmmiu',
                        prefix: 'cms4z',
                        image: 'http://placeimg.com/640/480/transport',
                        sort: 259004,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 95153247795948540,
                        longitude: 34280252954985570,
                        zoom: 30,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Unbranded Cotton Soap',
                        slug: 'et-dolorem-voluptatem',
                        administrativeAreaLevel1: 'jar1ng8ffek8lba1taf3gtr05v77f6gunkqca5lnculor1vb5j',
                        administrativeAreaLevel2: 'zbb8frhw48lfr9i5z9w4fdi9mzqz2fyf5watzrjisaczmvug06',
                        administrativeAreaLevel3: 'dqufn1arvwerrqahvvkeb3i5wfirrsc0gwjv6kycpl7fsv1pue',
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

    test('/GraphQL commonUpdateCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryInput!)
                    {
                        commonUpdateCountry (payload:$payload)
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
                            dataLang
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        iso3166Alpha2: 'iy',
                        iso3166Alpha3: 's9s',
                        iso3166Numeric: 'xqb',
                        customCode: 'qoqkqji728',
                        prefix: 'jiifz',
                        image: 'http://placeimg.com/640/480/cats',
                        sort: 395867,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 32906184850165236,
                        longitude: 28626505367483160,
                        zoom: 30,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Ergonomic Frozen Soap',
                        slug: 'et-temporibus-voluptatem',
                        administrativeAreaLevel1: 'aytyeexkmwb4ledubr5ze53h0dtt1of9mf9xuy50cx4r5p87on',
                        administrativeAreaLevel2: 'g30nx2cvqjh7sl24iovnigft68he4i7e0m2j74c6726tq37gm5',
                        administrativeAreaLevel3: '2eif1s72sncsw6kbzzgek8fpf0kxhagy6wviffs8q8o2mdxwyi',
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateCountry.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
                            dataLang
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
                    id: 'f2857c44-be10-461a-87e0-cd7adcc16ad3'
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
                            dataLang
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonDeleteCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});