/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { ToolsModule } from '@api/tools/tools.module';
import { ToolsIProcedureRepository, toolsMockProcedureData, ToolsMockProcedureSeeder } from '@app/tools/procedure';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('procedure', () =>
{
    let app: INestApplication;
    let procedureRepository: ToolsIProcedureRepository;
    let procedureSeeder: ToolsMockProcedureSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                ToolsModule,
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
                ToolsMockProcedureSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = toolsMockProcedureData;
        app = module.createNestApplication();
        procedureRepository = module.get<ToolsIProcedureRepository>(ToolsIProcedureRepository);
        procedureSeeder = module.get<ToolsMockProcedureSeeder>(ToolsMockProcedureSeeder);

        // seed mock data in memory database
        await procedureRepository.insert(procedureSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureId must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureName must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureType must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureVersion property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureVersion must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsExecuted property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isExecuted: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsExecuted must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsUpdated property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isUpdated: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsUpdated must be defined, can not be null');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureId must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureName must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureType must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureVersion property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureVersion must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsExecuted property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isExecuted: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsExecuted must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsUpdated property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isUpdated: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsUpdated must be defined, can not be undefined');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureName is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureName is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureVersion is too large, has a maximum length of 16', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                version: '*****************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureVersion is too large, has a maximum length of 16');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureHash is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                hash: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureHash is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsActive has to be a boolean value');
            });
    });
    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsExecuted has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isExecuted: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsExecuted has to be a boolean value');
            });
    });
    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureIsUpdated has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isUpdated: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureIsUpdated has to be a boolean value');
            });
    });
    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureType has to be a enum option of FUNCTION, PROCEDURE, TRIGGER', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                type: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureType has to be any of this options: FUNCTION, PROCEDURE, TRIGGER');
            });
    });
    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureExecutedAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                executedAt: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureExecutedAt has to be a timestamp value');
            });
    });
    test('/REST:POST tools/procedure/create - Got 400 Conflict, ProcedureCheckedAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                checkedAt: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ToolsProcedureCheckedAt has to be a timestamp value');
            });
    });

    test('/REST:POST tools/procedure/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST tools/procedures/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedures/paginate')
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
                    total: procedureSeeder.collectionResponse.length,
                    count: procedureSeeder.collectionResponse.length,
                    rows : procedureSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST tools/procedures/get', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedures/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    procedureSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST tools/procedure/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'f6bc1bf2-d9cb-594f-9801-d1e09cd343d6',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST tools/procedure/create', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST tools/procedure/find', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/find')
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

    test('/REST:POST tools/procedure/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/find/c7ca851c-47c4-5fa4-a44c-a741c9982c4d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST tools/procedure/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/tools/procedure/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT tools/procedure/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/tools/procedure/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '7863f99a-cc1f-5905-8df7-2fae7c335258',
            })
            .expect(404);
    });

    test('/REST:PUT tools/procedure/update', () =>
    {
        return request(app.getHttpServer())
            .put('/tools/procedure/update')
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

    test('/REST:DELETE tools/procedure/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/tools/procedure/delete/b0e21f1b-c6f5-54e9-9123-35dbdbb4be73')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE tools/procedure/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/tools/procedure/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL toolsCreateProcedure - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateProcedureInput!)
                    {
                        toolsCreateProcedure (payload:$payload)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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

    test('/GraphQL toolsPaginateProcedures', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        toolsPaginateProcedures (query:$query constraint:$constraint)
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
                expect(res.body.data.toolsPaginateProcedures).toEqual({
                    total: procedureSeeder.collectionResponse.length,
                    count: procedureSeeder.collectionResponse.length,
                    rows : procedureSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL toolsGetProcedures', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsGetProcedures (query:$query)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                for (const [index, value] of res.body.data.toolsGetProcedures.entries())
                {
                    expect(procedureSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL toolsCreateProcedure', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsCreateProcedureInput!)
                    {
                        toolsCreateProcedure (payload:$payload)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsCreateProcedure).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsFindProcedure - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindProcedure (query:$query)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                            id: '0fb98184-8e12-5f09-800e-baeb674dab25',
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

    test('/GraphQL toolsFindProcedure', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        toolsFindProcedure (query:$query)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsFindProcedure.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsFindProcedureById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindProcedureById (id:$id)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '52e7b4c7-c7ec-5fa3-9cc7-29adeb55d3f4',
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

    test('/GraphQL toolsFindProcedureById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        toolsFindProcedureById (id:$id)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsFindProcedureById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsUpdateProcedureById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateProcedureByIdInput!)
                    {
                        toolsUpdateProcedureById (payload:$payload)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '6125e589-1a85-5f82-88b9-d18ffe79ef40',
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

    test('/GraphQL toolsUpdateProcedureById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateProcedureByIdInput!)
                    {
                        toolsUpdateProcedureById (payload:$payload)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsUpdateProcedureById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsUpdateProcedures', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:ToolsUpdateProceduresInput! $query: QueryStatement)
                    {
                        toolsUpdateProcedures (payload:$payload query:$query)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsUpdateProcedures[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL toolsDeleteProcedureById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteProcedureById (id:$id)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'af761234-fbcf-5bc1-b932-35f51a0438d7',
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

    test('/GraphQL toolsDeleteProcedureById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        toolsDeleteProcedureById (id:$id)
                        {
                            id
                            name
                            type
                            version
                            isActive
                            isExecuted
                            isUpdated
                            upScript
                            downScript
                            sort
                            hash
                            executedAt
                            checkedAt
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
                expect(res.body.data.toolsDeleteProcedureById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await procedureRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
