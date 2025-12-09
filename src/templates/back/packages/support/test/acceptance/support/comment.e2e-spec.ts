/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { SupportModule } from '@api/support/support.module';
import {
    SupportICommentRepository,
    supportMockCommentData,
    SupportMockCommentSeeder,
} from '@app/support/comment';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('comment', () => {
    let app: INestApplication;
    let commentRepository: SupportICommentRepository;
    let commentSeeder: SupportMockCommentSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                SupportModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => {
                        return {
                            dialect: configService.get('TEST_DATABASE_DIALECT'),
                            storage: configService.get('TEST_DATABASE_STORAGE'),
                            host: configService.get('TEST_DATABASE_HOST'),
                            port: +configService.get('TEST_DATABASE_PORT'),
                            username: configService.get('TEST_DATABASE_USER'),
                            password: configService.get(
                                'TEST_DATABASE_PASSWORD',
                            ),
                            database: configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize: configService.get(
                                'TEST_DATABASE_SYNCHRONIZE',
                            ),
                            logging:
                                configService.get('TEST_DATABASE_LOGGIN') ===
                                'true'
                                    ? console.log
                                    : false,
                            autoLoadModels: true,
                            models: [],
                        };
                    },
                }),
            ],
            providers: [SupportMockCommentSeeder],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = supportMockCommentData;
        app = module.createNestApplication();
        commentRepository = module.get<SupportICommentRepository>(
            SupportICommentRepository,
        );
        commentSeeder = module.get<SupportMockCommentSeeder>(
            SupportMockCommentSeeder,
        );

        // seed mock data in memory database
        await commentRepository.insert(commentSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentDescription property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                description: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentDescription must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentDescription property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                description: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentDescription must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentIssueId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                issueId: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentIssueId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentAccountId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentAccountId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentExternalId is too large, has a maximum length of 64', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                externalId:
                    '*****************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentExternalId is too large, has a maximum length of 64',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentAccountUsername is too large, has a maximum length of 128', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountUsername:
                    '*********************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentAccountUsername is too large, has a maximum length of 128',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 400 Conflict, CommentDisplayName is too large, has a maximum length of 128', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                displayName:
                    '*********************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportCommentDisplayName is too large, has a maximum length of 128',
                );
            });
    });

    test('/REST:POST support/comment/create - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST support/comments/paginate', () => {
        return request(app.getHttpServer())
            .post('/support/comments/paginate')
            .set('Accept', 'application/json')
            .send({
                query: {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual({
                    total: commentSeeder.collectionResponse.length,
                    count: commentSeeder.collectionResponse.length,
                    rows: commentSeeder.collectionResponse
                        .map((item) =>
                            expect.objectContaining(
                                _.omit(item, [
                                    'createdAt',
                                    'updatedAt',
                                    'deletedAt',
                                ]),
                            ),
                        )
                        .slice(0, 5),
                });
            });
    });

    test('/REST:POST support/comments/get', () => {
        return request(app.getHttpServer())
            .post('/support/comments/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    commentSeeder.collectionResponse.map((item) =>
                        expect.objectContaining(
                            _.omit(item, [
                                'createdAt',
                                'updatedAt',
                                'deletedAt',
                            ]),
                        ),
                    ),
                );
            });
    });

    test('/REST:POST support/comment/find - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/support/comment/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '10e342fe-ec3b-5ff5-96d4-9f90e5d582b5',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST support/comment/create', () => {
        return request(app.getHttpServer())
            .post('/support/comment/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST support/comment/find', () => {
        return request(app.getHttpServer())
            .post('/support/comment/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:POST support/comment/find/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/support/comment/find/51ea912e-5de0-5706-ab69-3199fc4e7144')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST support/comment/find/{id}', () => {
        return request(app.getHttpServer())
            .post('/support/comment/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:PUT support/comment/update - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .put('/support/comment/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5c4ff5e5-72c1-5272-9b62-a8da41e86456',
            })
            .expect(404);
    });

    test('/REST:PUT support/comment/update', () => {
        return request(app.getHttpServer())
            .put('/support/comment/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:DELETE support/comment/delete/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .delete(
                '/support/comment/delete/a952cb2d-4fc7-5b1a-a301-0b48f081b307',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE support/comment/delete/{id}', () => {
        return request(app.getHttpServer())
            .delete(
                '/support/comment/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL supportCreateComment - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportCreateCommentInput!)
                    {
                        supportCreateComment (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            issueId
                            accountId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                        }
                    }
                `,
                variables: {
                    payload: _.omit(mockData[0], [
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ]),
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(409);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('already exist in database');
            });
    });

    test('/GraphQL supportPaginateComments', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        supportPaginateComments (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body.data.supportPaginateComments).toEqual({
                    total: commentSeeder.collectionResponse.length,
                    count: commentSeeder.collectionResponse.length,
                    rows: commentSeeder.collectionResponse
                        .map((item) =>
                            expect.objectContaining(
                                _.omit(item, [
                                    'createdAt',
                                    'updatedAt',
                                    'deletedAt',
                                ]),
                            ),
                        )
                        .slice(0, 5),
                });
            });
    });

    test('/GraphQL supportGetComments', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportGetComments (query:$query)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then((res) => {
                for (const [
                    index,
                    value,
                ] of res.body.data.supportGetComments.entries()) {
                    expect(commentSeeder.collectionResponse[index]).toEqual(
                        expect.objectContaining(
                            _.omit(value, [
                                'createdAt',
                                'updatedAt',
                                'deletedAt',
                            ]),
                        ),
                    );
                }
            });
    });

    test('/GraphQL supportCreateComment', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportCreateCommentInput!)
                    {
                        supportCreateComment (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            issueId
                            accountId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
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
            .then((res) => {
                expect(res.body.data.supportCreateComment).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportFindComment - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportFindComment (query:$query)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: '4974cb4f-10dc-53e0-9b35-b69c0fd4c86b',
                        },
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL supportFindComment', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportFindComment (query:$query)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body.data.supportFindComment.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportFindCommentById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        supportFindCommentById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e948c9cf-925c-59e2-b096-2373d7254726',
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL supportFindCommentById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        supportFindCommentById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
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
            .then((res) => {
                expect(res.body.data.supportFindCommentById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportUpdateCommentById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateCommentByIdInput!)
                    {
                        supportUpdateCommentById (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '09b9c1f7-c205-5721-8a76-7376f32f5ce7',
                    },
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL supportUpdateCommentById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateCommentByIdInput!)
                    {
                        supportUpdateCommentById (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
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
            .then((res) => {
                expect(res.body.data.supportUpdateCommentById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportUpdateComments', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateCommentsInput! $query: QueryStatement)
                    {
                        supportUpdateComments (payload:$payload query:$query)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
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
            .then((res) => {
                expect(res.body.data.supportUpdateComments[0].id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportDeleteCommentById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        supportDeleteCommentById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3d8769a2-9ad5-5b89-bd03-935429b7944d',
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty('errors');
                expect(
                    res.body.errors[0].extensions.originalError.statusCode,
                ).toBe(404);
                expect(
                    res.body.errors[0].extensions.originalError.message,
                ).toContain('not found');
            });
    });

    test('/GraphQL supportDeleteCommentById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        supportDeleteCommentById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            accountUsername
                            displayName
                            description
                            attachments
                            screenRecording
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
            .then((res) => {
                expect(res.body.data.supportDeleteCommentById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    afterAll(async () => {
        await commentRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
