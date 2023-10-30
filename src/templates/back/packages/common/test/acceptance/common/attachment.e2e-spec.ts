/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { CommonModule } from '@api/common/common.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { CommonIAttachmentRepository, commonMockAttachmentData, CommonMockAttachmentSeeder } from '@app/common/attachment';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let attachmentRepository: CommonIAttachmentRepository;
    let attachmentSeeder: CommonMockAttachmentSeeder;

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
                CommonMockAttachmentSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = commonMockAttachmentData;
        app = module.createNestApplication();
        attachmentRepository = module.get<CommonIAttachmentRepository>(CommonIAttachmentRepository);
        attachmentSeeder = module.get<CommonMockAttachmentSeeder>(CommonMockAttachmentSeeder);

        // seed mock data in memory database
        await attachmentRepository.insert(attachmentSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentId must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentFilename property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentFilename must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentMimetype property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentMimetype must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentExtension property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentExtension must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentRelativePathSegments property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                relativePathSegments: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentRelativePathSegments must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentSize property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentSize must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentUrl property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentUrl must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentIsCropable property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isCropable: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentIsCropable must be defined, can not be null');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentFilename property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentFilename must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentMimetype property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentMimetype must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentExtension property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentExtension must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentRelativePathSegments property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                relativePathSegments: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentRelativePathSegments must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentSize property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentSize must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentUrl property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentUrl must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentIsCropable property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isCropable: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentIsCropable must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                familyId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                libraryId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                sort: 1111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                alt: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentAlt is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                title: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                filename: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentFilename is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentMimetype is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mimetype: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentMimetype is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                extension: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentExtension is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                width: 111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentWidth is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                height: 111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentHeight is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: 11111111111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentSize is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 2047', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                url: '********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentUrl is too large, has a maximum length of 2047');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                libraryFilename: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentSize must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                size: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical Value for CommonAttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST common/attachment/create - Got 400 Conflict, AttachmentIsCropable has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isCropable: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CommonAttachmentIsCropable has to be a boolean value');
            });
    });

    test('/REST:POST common/attachment/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/attachments/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachments/paginate')
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
                    total: attachmentSeeder.collectionResponse.length,
                    count: attachmentSeeder.collectionResponse.length,
                    rows : attachmentSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/attachments/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachments/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    attachmentSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/attachment/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '250b2c98-4e62-5970-b32f-e1a016fb388f',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/attachment/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/attachment/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/find')
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

    test('/REST:POST common/attachment/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/find/981e16ed-06f3-5ecc-b64c-eb7f8beafbd1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST common/attachment/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/common/attachment/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/attachment/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/attachment/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '661235fc-e734-5168-8b04-9be9d5ffeb75',
            })
            .expect(404);
    });

    test('/REST:PUT common/attachment/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/attachment/update')
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

    test('/REST:DELETE common/attachment/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/attachment/delete/45d59686-d722-5305-8fad-058d05a25daf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/attachment/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/attachment/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAttachment - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAttachmentInput!)
                    {
                        commonCreateAttachment (payload:$payload)
                        {
                            id
                            familyId
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryId
                            libraryFilename
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

    test('/GraphQL commonPaginateAttachments', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateAttachments).toEqual({
                    total: attachmentSeeder.collectionResponse.length,
                    count: attachmentSeeder.collectionResponse.length,
                    rows : attachmentSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetAttachments', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAttachments (query:$query)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                for (const [index, value] of res.body.data.commonGetAttachments.entries())
                {
                    expect(attachmentSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAttachment', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAttachmentInput!)
                    {
                        commonCreateAttachment (payload:$payload)
                        {
                            id
                            familyId
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryId
                            libraryFilename
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
                expect(res.body.data.commonCreateAttachment).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAttachment - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachment (query:$query)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                            id: '99a424d4-45ae-59bf-830c-460ca5173661',
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

    test('/GraphQL commonFindAttachment', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAttachment (query:$query)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                expect(res.body.data.commonFindAttachment.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAttachmentById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentById (id:$id)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1a52d18d-8f7e-5022-aa8a-f3d8ef0e1d97',
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

    test('/GraphQL commonFindAttachmentById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAttachmentById (id:$id)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                expect(res.body.data.commonFindAttachmentById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAttachmentById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentByIdInput!)
                    {
                        commonUpdateAttachmentById (payload:$payload)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7290c297-2d8c-5016-808d-9ea5ee34baf2',
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

    test('/GraphQL commonUpdateAttachmentById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentByIdInput!)
                    {
                        commonUpdateAttachmentById (payload:$payload)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                expect(res.body.data.commonUpdateAttachmentById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAttachments', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAttachmentsInput! $query: QueryStatement)
                    {
                        commonUpdateAttachments (payload:$payload query:$query)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                expect(res.body.data.commonUpdateAttachments[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAttachmentById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentById (id:$id)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '62dd1a24-9f39-554b-9ac4-2308fecb09a9',
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

    test('/GraphQL commonDeleteAttachmentById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAttachmentById (id:$id)
                        {
                            id
                            sort
                            alt
                            title
                            filename
                            mimetype
                            extension
                            relativePathSegments
                            width
                            height
                            size
                            url
                            isCropable
                            libraryFilename
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
                expect(res.body.data.commonDeleteAttachmentById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await attachmentRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
