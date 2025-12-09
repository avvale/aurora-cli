/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { SupportModule } from '@api/support/support.module';
import {
    SupportIIssueRepository,
    supportMockIssueData,
    SupportMockIssueSeeder,
} from '@app/support/issue';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('issue', () => {
    let app: INestApplication;
    let issueRepository: SupportIIssueRepository;
    let issueSeeder: SupportMockIssueSeeder;

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
            providers: [SupportMockIssueSeeder],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = supportMockIssueData;
        app = module.createNestApplication();
        issueRepository = module.get<SupportIIssueRepository>(
            SupportIIssueRepository,
        );
        issueSeeder = module.get<SupportMockIssueSeeder>(
            SupportMockIssueSeeder,
        );

        // seed mock data in memory database
        await issueRepository.insert(issueSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueRowId property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueRowId must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueSubject property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueSubject must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueDescription property can not to be null', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                description: null,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueDescription must be defined, can not be null',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueRowId property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rowId: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueRowId must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueSubject property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueSubject must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueDescription property can not to be undefined', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                description: undefined,
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueDescription must be defined, can not be undefined',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueAccountId is not allowed, must be a length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueAccountId is not allowed, must be a length of 36',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueExternalId is too large, has a maximum length of 64', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                externalId:
                    '*****************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueExternalId is too large, has a maximum length of 64',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueExternalStatus is too large, has a maximum length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                externalStatus: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueExternalStatus is too large, has a maximum length of 36',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueExternalColorStatus is too large, has a maximum length of 16', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                externalColorStatus: '*****************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueExternalColorStatus is too large, has a maximum length of 16',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueAccountUsername is too large, has a maximum length of 128', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountUsername:
                    '*********************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueAccountUsername is too large, has a maximum length of 128',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueDisplayName is too large, has a maximum length of 128', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                displayName:
                    '*********************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueDisplayName is too large, has a maximum length of 128',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueFrontEnvironment is too large, has a maximum length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                frontEnvironment: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueFrontEnvironment is too large, has a maximum length of 36',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueFrontVersion is too large, has a maximum length of 16', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                frontVersion: '*****************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueFrontVersion is too large, has a maximum length of 16',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueBackEnvironment is too large, has a maximum length of 36', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                backEnvironment: '*************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueBackEnvironment is too large, has a maximum length of 36',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueBackVersion is too large, has a maximum length of 16', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                backVersion: '*****************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueBackVersion is too large, has a maximum length of 16',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 400 Conflict, IssueSubject is too large, has a maximum length of 510', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                subject:
                    '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then((res) => {
                expect(res.body.message).toContain(
                    'Value for SupportIssueSubject is too large, has a maximum length of 510',
                );
            });
    });

    test('/REST:POST support/issue/create - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST support/issues/paginate', () => {
        return request(app.getHttpServer())
            .post('/support/issues/paginate')
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
                    total: issueSeeder.collectionResponse.length,
                    count: issueSeeder.collectionResponse.length,
                    rows: issueSeeder.collectionResponse
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

    test('/REST:POST support/issues/get', () => {
        return request(app.getHttpServer())
            .post('/support/issues/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    issueSeeder.collectionResponse.map((item) =>
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

    test('/REST:POST support/issue/find - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/support/issue/find')
            .set('Accept', 'application/json')
            .send({
                query: {
                    where: {
                        id: '3aa68d5b-f4aa-51b4-8743-152ee3d2c51a',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST support/issue/create', () => {
        return request(app.getHttpServer())
            .post('/support/issue/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST support/issue/find', () => {
        return request(app.getHttpServer())
            .post('/support/issue/find')
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

    test('/REST:POST support/issue/find/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/support/issue/find/95802429-0d3c-5da1-b25d-df17a7d89801')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST support/issue/find/{id}', () => {
        return request(app.getHttpServer())
            .post('/support/issue/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/REST:PUT support/issue/update - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .put('/support/issue/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'e0bca651-2a03-5977-af01-311cd47d4332',
            })
            .expect(404);
    });

    test('/REST:PUT support/issue/update', () => {
        return request(app.getHttpServer())
            .put('/support/issue/update')
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

    test('/REST:DELETE support/issue/delete/{id} - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .delete(
                '/support/issue/delete/75dd9747-67b4-5be2-85af-c4c60322f34b',
            )
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE support/issue/delete/{id}', () => {
        return request(app.getHttpServer())
            .delete(
                '/support/issue/delete/5b19d6ac-4081-573b-96b3-56964d5326a8',
            )
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL supportCreateIssue - Got 409 Conflict, item already exist in database', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportCreateIssueInput!)
                    {
                        supportCreateIssue (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountId
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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

    test('/GraphQL supportPaginateIssues', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        supportPaginateIssues (query:$query constraint:$constraint)
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
                expect(res.body.data.supportPaginateIssues).toEqual({
                    total: issueSeeder.collectionResponse.length,
                    count: issueSeeder.collectionResponse.length,
                    rows: issueSeeder.collectionResponse
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

    test('/GraphQL supportGetIssues', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportGetIssues (query:$query)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                ] of res.body.data.supportGetIssues.entries()) {
                    expect(issueSeeder.collectionResponse[index]).toEqual(
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

    test('/GraphQL supportCreateIssue', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportCreateIssueInput!)
                    {
                        supportCreateIssue (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountId
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportCreateIssue).toHaveProperty(
                    'id',
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportFindIssue - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportFindIssue (query:$query)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                            id: '6dc0327d-7ecf-5023-a645-12198dcce962',
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

    test('/GraphQL supportFindIssue', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        supportFindIssue (query:$query)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportFindIssue.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportFindIssueById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        supportFindIssueById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                    id: 'ba9ef9a8-ef16-54c7-88e7-6a2936f5928c',
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

    test('/GraphQL supportFindIssueById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        supportFindIssueById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportFindIssueById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportUpdateIssueById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateIssueByIdInput!)
                    {
                        supportUpdateIssueById (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                        id: '2373e888-3f27-5bf1-8c9e-6f71c77f12aa',
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

    test('/GraphQL supportUpdateIssueById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateIssueByIdInput!)
                    {
                        supportUpdateIssueById (payload:$payload)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportUpdateIssueById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportUpdateIssues', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:SupportUpdateIssuesInput! $query: QueryStatement)
                    {
                        supportUpdateIssues (payload:$payload query:$query)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportUpdateIssues[0].id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    test('/GraphQL supportDeleteIssueById - Got 404 Not Found', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        supportDeleteIssueById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                    id: '270a2ecf-eb29-5a0a-979a-60679e178296',
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

    test('/GraphQL supportDeleteIssueById', () => {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        supportDeleteIssueById (id:$id)
                        {
                            id
                            rowId
                            externalId
                            externalStatus
                            externalColorStatus
                            accountUsername
                            displayName
                            frontEnvironment
                            frontVersion
                            backEnvironment
                            backVersion
                            subject
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
                expect(res.body.data.supportDeleteIssueById.id).toStrictEqual(
                    '5b19d6ac-4081-573b-96b3-56964d5326a8',
                );
            });
    });

    afterAll(async () => {
        await issueRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
