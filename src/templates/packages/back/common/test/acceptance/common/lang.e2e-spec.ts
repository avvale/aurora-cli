/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '../../../src/@apps/common/lang/domain/lang.repository';
import { MockLangSeeder } from '../../../src/@apps/common/lang/infrastructure/mock/mock-lang.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('lang', () =>
{
    let app: INestApplication;
    let repository: ILangRepository;
    let seeder: MockLangSeeder;

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
                MockLangSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ILangRepository>(ILangRepository);
        seeder          = module.get<MockLangSeeder>(MockLangSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Handmade Rubber Tuna',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'ik',
                iso6393: 'rnd',
                ietf: '9xek7',
                customCode: 'vpz7sdo6gd',
                dir: 'RTL',
                sort: 257581,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '06b21767-899f-48c9-908f-e0670f634de0',
                name: null,
                image: 'http://placeimg.com/640/480/city',
                iso6392: 'eb',
                iso6393: 'osy',
                ietf: 'ff5fp',
                customCode: 't0f99pj5jy',
                dir: 'RTL',
                sort: 306335,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '379d38a1-439d-45b6-95a7-59f4379132ab',
                name: 'Handcrafted Fresh Table',
                image: 'http://placeimg.com/640/480/business',
                iso6392: null,
                iso6393: 'ia8',
                ietf: '6yp8v',
                customCode: 'u0m232a8ia',
                dir: 'RTL',
                sort: 282223,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'affc640d-16ff-446f-85d2-4940ce219a4d',
                name: 'Rustic Frozen Tuna',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: '0p',
                iso6393: null,
                ietf: 'ynqcp',
                customCode: 'gdmy8anhjb',
                dir: 'RTL',
                sort: 783016,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '592fa056-8dbf-4ad6-8151-eca3c7fd52b9',
                name: 'Incredible Granite Pizza',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'k5',
                iso6393: 'xf8',
                ietf: null,
                customCode: 'dswu5v7jne',
                dir: 'LTR',
                sort: 738529,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangDir property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'ed2cdc5e-8021-4930-bd16-28be7662024a',
                name: 'Rustic Soft Shoes',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: 'kb',
                iso6393: 'sgt',
                ietf: 'pf70m',
                customCode: '11jxjvmqvc',
                dir: null,
                sort: 928160,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '507e2a94-83f9-465e-845a-cf7eea1a78fa',
                name: 'Handcrafted Soft Fish',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'ak',
                iso6393: 'gzk',
                ietf: '4pypq',
                customCode: 'i65mif6r9p',
                dir: 'LTR',
                sort: 383007,
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                name: 'Awesome Steel Bike',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: '8w',
                iso6393: 'jlu',
                ietf: 't7cni',
                customCode: 'mgoao2jvhp',
                dir: 'RTL',
                sort: 740242,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '53497c68-f52c-400b-aa45-d232fedd22b6',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: 'd2',
                iso6393: 'd45',
                ietf: 's4oyf',
                customCode: 'zu6s79r4yo',
                dir: 'RTL',
                sort: 292915,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86049b19-2c60-4c60-b97d-40e89ccb9b26',
                name: 'Tasty Steel Mouse',
                image: 'http://placeimg.com/640/480/sports',
                iso6393: 'avz',
                ietf: 'se350',
                customCode: '8cn3fsgo44',
                dir: 'RTL',
                sort: 132581,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '867dfecd-e51c-44ad-bb59-f213e6878879',
                name: 'Practical Wooden Shirt',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'll',
                ietf: 'plt6s',
                customCode: 'jr1zm3xv7g',
                dir: 'RTL',
                sort: 240847,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '94a2f909-85ad-4c30-817a-cc2c27631159',
                name: 'Incredible Frozen Pants',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'ss',
                iso6393: 'f9r',
                customCode: 'uk54o27h1a',
                dir: 'LTR',
                sort: 887582,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangDir property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'b162ab51-1bfc-4b7c-923f-e281b9f46af9',
                name: 'Gorgeous Granite Computer',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: '7i',
                iso6393: 'pqs',
                ietf: '7a4v7',
                customCode: 'kgh3n03bjt',
                sort: 467718,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '044c8379-cc96-4844-a154-6b5814c37178',
                name: 'Handmade Granite Chair',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'ma',
                iso6393: '02b',
                ietf: 'i37zp',
                customCode: 'cu7nebfj50',
                dir: 'RTL',
                sort: 390388,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '14hqip08q9bai11m4n7l8hyftw7448fonu77o',
                name: 'Fantastic Rubber Towels',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: '0o',
                iso6393: 'ha6',
                ietf: 'erwns',
                customCode: 's0yduxkcmz',
                dir: 'RTL',
                sort: 581729,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'abd06a09-2f37-437f-b40f-d87b56bf38c8',
                name: 'Sleek Soft Pants',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'y0c',
                iso6393: 'apm',
                ietf: 'kzvq5',
                customCode: 'z3loobjwgj',
                dir: 'RTL',
                sort: 156652,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'a1005b54-d7a4-46eb-952b-8fcae81705f0',
                name: 'Incredible Wooden Shoes',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: '33',
                iso6393: 'mpm4',
                ietf: 'i7w3d',
                customCode: 'm6b2glp5f8',
                dir: 'RTL',
                sort: 261859,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '45d13c19-9ef1-4059-9fd1-f56a3b651e58',
                name: 'Small Wooden Chips',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'e2',
                iso6393: 's69',
                ietf: 'l4xnqp',
                customCode: 'w48ms51033',
                dir: 'LTR',
                sort: 783460,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '2e809a7f-760c-493b-a9ff-4098d251fa51',
                name: 'Licensed Wooden Pants',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '9y',
                iso6393: 'k7r',
                ietf: 'w3zvr',
                customCode: 'aycbt0zzqa1',
                dir: 'RTL',
                sort: 719224,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '962e4345-f219-45f0-8e14-cb630110ac5b',
                name: 'Intelligent Frozen Chicken',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'vd',
                iso6393: 'eey',
                ietf: 'td1c1',
                customCode: '8x4ea30eso',
                dir: 'RTL',
                sort: 2944063,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '92b50df9-7563-4b9b-9595-92b0f93fe8a0',
                name: 'Handcrafted Steel Soap',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: 'rq',
                iso6393: 'jgh',
                ietf: 'cyrti',
                customCode: 'uydgvopqi7',
                dir: 'RTL',
                sort: 649592,
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    test('/REST:POST common/lang - Got 400 Conflict, LangDir has to be a enum option of LTR, RTL', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '502b46df-c7bd-4754-9590-3e8bd9e8b1bf',
                name: 'Awesome Steel Chips',
                image: 'http://placeimg.com/640/480/people',
                iso6392: '4y',
                iso6393: 'ssz',
                ietf: '4vnxe',
                customCode: 'r43ekk9qro',
                dir: 'XXXX',
                sort: 968805,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for LangDir has to be any of this options: LTR, RTL');
            });
    });

    test('/REST:POST common/lang - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST common/langs/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/langs/paginate')
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

    test('/REST:GET common/langs', () =>
    {
        return request(app.getHttpServer())
            .get('/common/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/lang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'b5304347-a473-4ec3-a08a-3ee7fa7f45e3'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/lang', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Incredible Concrete Shirt',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'u1',
                iso6393: 'tbe',
                ietf: 'rqmsu',
                customCode: 'enehjam5o7',
                dir: 'RTL',
                sort: 691331,
                isActive: false,
            })
            .expect(201);
    });

    test('/REST:GET common/lang', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang')
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

    test('/REST:GET common/lang/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang/24ec8a2c-060c-4928-8e4a-a3b8777ed23d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/lang/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/lang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '73252aaf-721a-4322-8ff9-43658ec4bbbf',
                name: 'Gorgeous Plastic Fish',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: '89',
                iso6393: 'i46',
                ietf: 'p151m',
                customCode: '1dhqipgcb5',
                dir: 'RTL',
                sort: 616043,
                isActive: true,
            })
            .expect(404);
    });

    test('/REST:PUT common/lang', () =>
    {
        return request(app.getHttpServer())
            .put('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Fantastic Plastic Gloves',
                image: 'http://placeimg.com/640/480/food',
                iso6392: '9h',
                iso6393: 'jvo',
                ietf: '6oab6',
                customCode: 'afvw4o8xym',
                dir: 'LTR',
                sort: 925434,
                isActive: false,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/lang/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/lang/92d5792a-3596-4617-9c7d-4c186a249bfd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/lang/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/lang/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateLang - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateLangInput!)
                    {
                        commonCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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

    test('/GraphQL commonPaginateLangs', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateLangs (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateLangs).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL commonGetLangs', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetLangs (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                for (const [index, value] of res.body.data.commonGetLangs.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateLangInput!)
                    {
                        commonCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Fantastic Frozen Ball',
                        image: 'http://placeimg.com/640/480/abstract',
                        iso6392: 'gh',
                        iso6393: 'w6c',
                        ietf: 'iti70',
                        customCode: 'pf9c18sq3x',
                        dir: 'LTR',
                        sort: 707111,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonCreateLang).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindLang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                            id: '11f536e2-4785-4486-9197-e8fd2ee850d0'
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

    test('/GraphQL commonFindLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                expect(res.body.data.commonFindLang.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindLangById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc6390d2-04b8-4ccb-9907-7131409005a6'
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

    test('/GraphQL commonFindLangById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                expect(res.body.data.commonFindLangById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateLang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateLangInput!)
                    {
                        commonUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b1e6ecf8-2483-45d3-89de-9efcfff00a70',
                        name: 'Small Concrete Chips',
                        image: 'http://placeimg.com/640/480/nature',
                        iso6392: 'r9',
                        iso6393: '0kr',
                        ietf: 'm3h1m',
                        customCode: '20cbbg91sv',
                        dir: 'RTL',
                        sort: 251252,
                        isActive: true,
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

    test('/GraphQL commonUpdateLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateLangInput!)
                    {
                        commonUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Practical Concrete Hat',
                        image: 'http://placeimg.com/640/480/food',
                        iso6392: 'bp',
                        iso6393: '0ci',
                        ietf: '860jg',
                        customCode: '5qxxgbrv5d',
                        dir: 'LTR',
                        sort: 928865,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateLang.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteLangById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e0576cc9-47ab-4452-85c1-3e76245f32ae'
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

    test('/GraphQL commonDeleteLangById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                expect(res.body.data.commonDeleteLangById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});