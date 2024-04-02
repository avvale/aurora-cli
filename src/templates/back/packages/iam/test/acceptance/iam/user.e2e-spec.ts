/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamModule } from '@api/iam/iam.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { IamIUserRepository, iamMockUserData, IamMockUserSeeder } from '@app/iam/user';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let userRepository: IamIUserRepository;
    let userSeeder: IamMockUserSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule,
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
                IamMockUserSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = iamMockUserData;
        app = module.createNestApplication();
        userRepository = module.get<IamIUserRepository>(IamIUserRepository);
        userSeeder = module.get<IamMockUserSeeder>(IamMockUserSeeder);

        // seed mock data in memory database
        await userRepository.insert(userSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserAccountId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                username: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserUsername must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                password: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserPassword must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserAccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                username: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserUsername must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                password: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserPassword must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                langId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserName is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserSurname is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                surname: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserSurname is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                avatar: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserAvatar is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserMobile is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                mobile: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserMobile is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                username: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserUsername is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                password: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserPassword is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rememberToken: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamUserRememberToken is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST iam/user/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/users/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/users/paginate')
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
                    total: userSeeder.collectionResponse.length,
                    count: userSeeder.collectionResponse.length,
                    rows : userSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/users/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/users/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    userSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST iam/user/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'bf506093-ebc1-59a3-a593-a51e83e1e902',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/user/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST iam/user/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find')
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

    test('/REST:POST iam/user/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find/686e4086-5c28-5cdd-b3f3-a75e48bafb74')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST iam/user/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/user/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '13b379aa-70ae-5986-8dc7-b25665f9537b',
            })
            .expect(404);
    });

    test('/REST:PUT iam/user/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user/update')
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

    test('/REST:DELETE iam/user/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/delete/7de61996-1432-5ad9-97d5-1e767da51e1a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/user/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test('/GraphQL iamPaginateUsers', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers).toEqual({
                    total: userSeeder.collectionResponse.length,
                    count: userSeeder.collectionResponse.length,
                    rows : userSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetUsers', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(userSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateUser', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindUser - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '59ff60bf-e503-5235-ad00-0e38102c1c97',
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

    test('/GraphQL iamFindUser', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamFindUser.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindUserById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '79f72934-b560-59ad-9ef1-d70978dca578',
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

    test('/GraphQL iamFindUserById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamFindUserById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateUserById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateUserByIdInput!)
                    {
                        iamUpdateUserById (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'afbc2035-2063-5731-b1c5-9455b37e333b',
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

    test('/GraphQL iamUpdateUserById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateUserByIdInput!)
                    {
                        iamUpdateUserById (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamUpdateUserById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateUsers', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateUsersInput! $query: QueryStatement)
                    {
                        iamUpdateUsers (payload:$payload query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamUpdateUsers[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteUserById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dcb2f282-5678-5305-a233-2dad33eddf1b',
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

    test('/GraphQL iamDeleteUserById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await userRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
