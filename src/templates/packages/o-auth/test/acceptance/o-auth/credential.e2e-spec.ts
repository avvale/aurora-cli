import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { AuthModule } from '@apps/o-auth/shared/modules/auth.module';
import { IamModule } from '@api/iam/iam.module';
import { MockJwtService } from '@apps/o-auth/access-token/infrastructure/mock/mock-jwt.service';
import { OAuthClientGrantType } from '../../../src/graphql';
import { IApplicationRepository } from '@apps/o-auth/application';
import { MockApplicationSeeder } from '@apps/o-auth/application/infrastructure/mock/mock-application.seeder';
import { IClientRepository } from '@apps/o-auth/client';
import { MockClientSeeder } from '@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { IAccountRepository } from '@apps/iam/account';
import { MockAccountSeeder } from '@apps/iam/account/infrastructure/mock/mock-account.seeder';
import { IUserRepository } from '@apps/iam/user';
import { MockUserSeeder } from '@apps/iam/user/infrastructure/mock/mock-user.seeder';

const importForeignModules = [];

describe('credential', () =>
{
    let app: INestApplication;
    let applicationRepository: IApplicationRepository;
    let applicationSeeder: MockApplicationSeeder;
    let clientRepository: IClientRepository;
    let clientSeeder: MockClientSeeder;
    let accountRepository: IAccountRepository;
    let accountSeeder: MockAccountSeeder;
    let userRepository: IUserRepository;
    let userSeeder: MockUserSeeder;
    let mockJwt: string;
    const jwtOptions: JwtModuleOptions = {
        secret: '1234567890',
    };
    //let repository: MockCredentialRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                IamModule,
                AuthModule.forRoot(jwtOptions),
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
                MockApplicationSeeder,
                MockClientSeeder,
                MockAccountSeeder,
                MockUserSeeder,
                MockJwtService,
            ],
        })
            .compile();

        app                     = module.createNestApplication();
        applicationRepository   = module.get<IApplicationRepository>(IApplicationRepository);
        applicationSeeder       = module.get<MockApplicationSeeder>(MockApplicationSeeder);
        clientRepository        = module.get<IClientRepository>(IClientRepository);
        clientSeeder            = module.get<MockClientSeeder>(MockClientSeeder);
        accountRepository       = module.get<IAccountRepository>(IAccountRepository);
        accountSeeder           = module.get<MockAccountSeeder>(MockAccountSeeder);
        userRepository          = module.get<IUserRepository>(IUserRepository);
        userSeeder              = module.get<MockUserSeeder>(MockUserSeeder);
        mockJwt                 = module.get(MockJwtService).getJwt();

        // poblate database
        await applicationRepository.insert(applicationSeeder.collectionSource);
        await clientRepository.insert(clientSeeder.collectionSource);
        await accountRepository.insert(accountSeeder.collectionSource);
        await userRepository.insert(userSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/credential - Got 201, accessToken and refreshToken obtained', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '1111',
            })
            .expect(201)
            .then(res =>
            {
                expect(res.body).toHaveProperty('accessToken');
                expect(res.body).toHaveProperty('refreshToken');
            });
    });

    test('/REST:POST o-auth/credential - Got 401, Unauthorized to access by wrong password', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '2222',

            })
            .expect(401);
    });

    test('/REST:POST o-auth/credential - Got 401 user not found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : '*****@gmail.com',
                password : '1111',

            })
            .expect(404)
            .then(res =>
            {
                expect(res.body.message).toContain('IamUser not found');
            });
    });

    test('/REST:POST o-auth/credential - Got 404, wrong application code', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhMjokMnkkMTAkRU9BL1NLRXdLUmdIUHc2NGtPNExaLjZveTViOGtsNkp6Vy9tQ1JPTWZTcTZTMzgvSWl5d0c=`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '1111',
            })
            .expect(404)
            .then(res =>
            {
                expect(res.body.message).toContain('OAuthApplication not found');
            });
    });

    test('/REST:POST o-auth/credential - Got 404, wrong application secret', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '1111',
            })
            .expect(404)
            .then(res =>
            {
                expect(res.body.message).toContain('OAuthApplication not found');
            });
    });

    test('/REST:POST o-auth/credential - Got 400, wrong Authorization header', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ***************`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '1111',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Authorization header has not a valid value, current decode value is: ');
            });
    });

    test('/REST:POST o-auth/credential - Got 400, ApplicationAuthorizationHeader not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
                password : '1111',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationAuthorizationHeader must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/credential - Got 400, grantType property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                username: 'john.doe@gmail.com',
                password: '1111',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for grantType property must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/credential - Got 400, username property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                password : '1111',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/credential - Got 400, password property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : 'john.doe@gmail.com',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });


    test('/GraphQL oAuthCreateCredential - Got 201, accessToken and refreshToken obtained', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateCredential).toHaveProperty('accessToken');
                expect(res.body.data.oAuthCreateCredential).toHaveProperty('refreshToken');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 401, Unauthorized to access by wrong password', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '2222',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(401);
                expect(res.body.errors[0].extensions.response.message).toContain('Unauthorized');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 401, Unauthorized to access by wrong password', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : '*****@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('IamUser not found');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 404, wrong application code', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhMjokMnkkMTAkRU9BL1NLRXdLUmdIUHc2NGtPNExaLjZveTViOGtsNkp6Vy9tQ1JPTWZTcTZTMzgvSWl5d0c=`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('OAuthApplication not found');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 404, wrong application secret', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('OAuthApplication not found');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 400, wrong Authorization header', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ***************`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(400);
                expect(res.body.errors[0].extensions.response.message).toContain('Authorization header has not a valid value, current decode value is: ');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 400, ApplicationAuthorizationHeader not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(400);
                expect(res.body.errors[0].extensions.response.message).toContain('Value for ApplicationAuthorizationHeader must be defined, can not be undefined');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 400, grantType property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        username: 'john.doe@gmail.com',
                        password: '1111',
                    },
                },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.errors[0].message).toContain('Variable "$payload" got invalid value');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 400, username property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        password : '1111',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(400);
                expect(res.body.errors[0].extensions.response.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test('/GraphQL oAuthCreateCredential - Got 400, password property not defined', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {
                            accessToken
                            refreshToken
                        }
                    }
                `,
                variables:
                {
                    payload: {
                        grantType: OAuthClientGrantType.PASSWORD,
                        username : 'john.doe@gmail.com',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.errors[0].extensions.response.statusCode).toBe(400);
                expect(res.body.errors[0].extensions.response.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});