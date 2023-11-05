/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { CommonIAttachmentLibraryRepository, commonMockAttachmentLibraryData, CommonMockAttachmentLibrarySeeder } from '@app/common/attachment-library';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let attachmentLibraryRepository: CommonIAttachmentLibraryRepository;
    let attachmentLibrarySeeder: CommonMockAttachmentLibrarySeeder;

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
                CommonMockAttachmentLibrarySeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = commonMockAttachmentLibraryData;
        app = module.createNestApplication();
        attachmentLibraryRepository = module.get<CommonIAttachmentLibraryRepository>(CommonIAttachmentLibraryRepository);
        attachmentLibrarySeeder = module.get<CommonMockAttachmentLibrarySeeder>(CommonMockAttachmentLibrarySeeder);

        // seed mock data in memory database
        await attachmentLibraryRepository.insert(attachmentLibrarySeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryFilename property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryMimetype property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryMimetype must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryExtension property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryExtension must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryRelativePathSegments property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                relativePathSegments: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryRelativePathSegments must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryWidth property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                width: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryWidth must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryHeight property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                height: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryHeight must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibrarySize property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibrarySize must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryUrl property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryFilename must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryMimetype property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryMimetype must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryExtension property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryExtension must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryRelativePathSegments property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                relativePathSegments: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryRelativePathSegments must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryWidth property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                width: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryWidth must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryHeight property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                height: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryHeight must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibrarySize must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryUrl must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryMimetype is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryMimetype is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryExtension is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                width: 111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryWidth is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                height: 111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryHeight is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 2047', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: '********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryUrl is too large, has a maximum length of 2047');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 400 Conflict, AttachmentLibrarySize must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical Value for CommonAttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/attachment-library/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/attachment-libraries/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-libraries/paginate')
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
                    total: attachmentLibrarySeeder.collectionResponse.length,
                    count: attachmentLibrarySeeder.collectionResponse.length,
                    rows : attachmentLibrarySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/attachment-libraries/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-libraries/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    attachmentLibrarySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/attachment-library/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'ce035ee0-5ec2-525b-9335-932eb70ff365',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/attachment-library/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/attachment-library/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/find')
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

    test('/REST:POST common/attachment-library/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/find/12429b2e-93ec-5c89-a897-eb9b4f414514')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST common/attachment-library/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment-library/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/attachment-library/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/attachment-library/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '1b3425fa-d114-5aa4-896f-07311cee7ea0',
            })
            .expect(404);
    });

    test('/REST:PUT common/attachment-library/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/attachment-library/update')
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

    test('/REST:DELETE common/attachment-library/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/attachment-library/delete/bf8e5e68-a22c-5123-b82c-afc1943be6c4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/attachment-library/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/attachment-library/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAttachmentLibrary - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAttachmentLibraryInput!)
                    {
                        commonCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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

    test('/GraphQL commonPaginateAttachmentLibraries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateAttachmentLibraries).toEqual({
                    total: attachmentLibrarySeeder.collectionResponse.length,
                    count: attachmentLibrarySeeder.collectionResponse.length,
                    rows : attachmentLibrarySeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetAttachmentLibraries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAttachmentLibraries (query:$query)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                for (const [index, value] of res.body.data.commonGetAttachmentLibraries.entries())
                {
                    expect(attachmentLibrarySeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAttachmentLibrary', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAttachmentLibraryInput!)
                    {
                        commonCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonCreateAttachmentLibrary).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAttachmentLibrary - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachmentLibrary (query:$query)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                            id: '52f08a1f-5d00-5c14-b7c4-df9051f880df',
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

    test('/GraphQL commonFindAttachmentLibrary', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachmentLibrary (query:$query)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonFindAttachmentLibrary.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAttachmentLibraryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentLibraryById (id:$id)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1e5064fe-7714-55dc-94bd-b226071b91eb',
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

    test('/GraphQL commonFindAttachmentLibraryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentLibraryById (id:$id)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonFindAttachmentLibraryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAttachmentLibraryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentLibraryByIdInput!)
                    {
                        commonUpdateAttachmentLibraryById (payload:$payload)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '23a03d19-0b7b-560a-a4eb-efb73b8e7a5e',
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

    test('/GraphQL commonUpdateAttachmentLibraryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentLibraryByIdInput!)
                    {
                        commonUpdateAttachmentLibraryById (payload:$payload)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonUpdateAttachmentLibraryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAttachmentLibraries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentLibrariesInput! $query: QueryStatement)
                    {
                        commonUpdateAttachmentLibraries (payload:$payload query:$query)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonUpdateAttachmentLibraries[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAttachmentLibraryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2831e7d3-d2f6-5353-ab91-9dfec59082b0',
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

    test('/GraphQL commonDeleteAttachmentLibraryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            meta
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
                expect(res.body.data.commonDeleteAttachmentLibraryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await attachmentLibraryRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
