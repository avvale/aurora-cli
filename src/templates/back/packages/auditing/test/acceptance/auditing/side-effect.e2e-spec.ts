/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { AuditingModule } from '@api/auditing/auditing.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuditingISideEffectRepository, auditingMockSideEffectData, AuditingMockSideEffectSeeder } from '@app/auditing/side-effect';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('side-effect', () =>
{
    let app: INestApplication;
    let sideEffectRepository: AuditingISideEffectRepository;
    let sideEffectSeeder: AuditingMockSideEffectSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                AuditingModule,
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
                AuditingMockSideEffectSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = auditingMockSideEffectData;
        app = module.createNestApplication();
        sideEffectRepository = module.get<AuditingISideEffectRepository>(AuditingISideEffectRepository);
        sideEffectSeeder = module.get<AuditingMockSideEffectSeeder>(AuditingMockSideEffectSeeder);

        // seed mock data in memory database
        await sideEffectRepository.insert(sideEffectSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectId must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelPath property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelPath: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelPath must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelName: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelName must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectAccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectAccountId must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEmail property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                email: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEmail must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEvent property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEvent must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectIsRollback property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRollback: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectIsRollback must be defined, can not be null');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectId must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelPath property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelPath: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelPath must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelName: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelName must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectAccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectAccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEmail property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                email: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEmail must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEvent property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEvent must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectIsRollback property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRollback: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectIsRollback must be defined, can not be undefined');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectOperationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                operationId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectOperationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                accountId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectAuditableId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                auditableId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectAuditableId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectRollbackSideEffectId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                rollbackSideEffectId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectRollbackSideEffectId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelPath is too large, has a maximum length of 1022', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelPath: '***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelPath is too large, has a maximum length of 1022');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectModelName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                modelName: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectModelName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEmail is too large, has a maximum length of 127', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                email: '********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEmail is too large, has a maximum length of 127');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectIp is too large, has a maximum length of 19', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ip: '********************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectIp is too large, has a maximum length of 19');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectBaseUrl is too large, has a maximum length of 2046', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                baseUrl: '*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectBaseUrl is too large, has a maximum length of 2046');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectUserAgent is too large, has a maximum length of 1022', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                userAgent: '***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectUserAgent is too large, has a maximum length of 1022');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectIsRollback has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isRollback: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectIsRollback has to be a boolean value');
            });
    });
    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectEvent has to be a enum option of CREATED, BULK_CREATED, UPDATED, BULK_UPDATED, DELETED, BULK_DELETED, RESTORED, BULK_RESTORED, UPSERTED', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                event: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectEvent has to be any of this options: CREATED, BULK_CREATED, UPDATED, BULK_UPDATED, DELETED, BULK_DELETED, RESTORED, BULK_RESTORED, UPSERTED');
            });
    });
    test('/REST:POST auditing/side-effect/create - Got 400 Conflict, SideEffectMethod has to be a enum option of GET, POST, UPDATE, DELETE', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                method: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuditingSideEffectMethod has to be any of this options: GET, POST, UPDATE, DELETE');
            });
    });

    test('/REST:POST auditing/side-effect/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST auditing/side-effects/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effects/paginate')
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
                    total: sideEffectSeeder.collectionResponse.length,
                    count: sideEffectSeeder.collectionResponse.length,
                    rows : sideEffectSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST auditing/side-effects/get', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effects/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    sideEffectSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST auditing/side-effect/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'dee557e5-718f-5a9f-b111-472f1678040d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST auditing/side-effect/create', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST auditing/side-effect/find', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/find')
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

    test('/REST:POST auditing/side-effect/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/find/5b25b039-7edd-500c-ae7e-0e3ac21889cc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST auditing/side-effect/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/auditing/side-effect/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT auditing/side-effect/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/auditing/side-effect/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '56d4cacf-9aca-5441-9c08-648a95af11c0',
            })
            .expect(404);
    });

    test('/REST:PUT auditing/side-effect/update', () =>
    {
        return request(app.getHttpServer())
            .put('/auditing/side-effect/update')
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

    test('/REST:DELETE auditing/side-effect/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/auditing/side-effect/delete/d988a82c-7a9f-581b-bc8d-1aedb40045ec')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE auditing/side-effect/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/auditing/side-effect/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL auditingCreateSideEffect - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingCreateSideEffectInput!)
                    {
                        auditingCreateSideEffect (payload:$payload)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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

    test('/GraphQL auditingPaginateSideEffects', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        auditingPaginateSideEffects (query:$query constraint:$constraint)
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
                expect(res.body.data.auditingPaginateSideEffects).toEqual({
                    total: sideEffectSeeder.collectionResponse.length,
                    count: sideEffectSeeder.collectionResponse.length,
                    rows : sideEffectSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL auditingGetSideEffects', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingGetSideEffects (query:$query)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                for (const [index, value] of res.body.data.auditingGetSideEffects.entries())
                {
                    expect(sideEffectSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL auditingCreateSideEffect', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingCreateSideEffectInput!)
                    {
                        auditingCreateSideEffect (payload:$payload)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingCreateSideEffect).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingFindSideEffect - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingFindSideEffect (query:$query)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                            id: 'd2b9dac5-9371-5271-ac9c-b84a91ea16ec',
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

    test('/GraphQL auditingFindSideEffect', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        auditingFindSideEffect (query:$query)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingFindSideEffect.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingFindSideEffectById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        auditingFindSideEffectById (id:$id)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0aae304d-9fe0-581a-935a-7c2c6b5809aa',
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

    test('/GraphQL auditingFindSideEffectById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        auditingFindSideEffectById (id:$id)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingFindSideEffectById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingUpdateSideEffectById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateSideEffectByIdInput!)
                    {
                        auditingUpdateSideEffectById (payload:$payload)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '83dc03f2-f51b-511e-a982-e9bcaa88905d',
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

    test('/GraphQL auditingUpdateSideEffectById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateSideEffectByIdInput!)
                    {
                        auditingUpdateSideEffectById (payload:$payload)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingUpdateSideEffectById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingUpdateSideEffects', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:AuditingUpdateSideEffectsInput! $query: QueryStatement)
                    {
                        auditingUpdateSideEffects (payload:$payload query:$query)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingUpdateSideEffects[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL auditingDeleteSideEffectById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        auditingDeleteSideEffectById (id:$id)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5aed12d1-9fcf-5271-a2b6-5dc8f09b97ab',
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

    test('/GraphQL auditingDeleteSideEffectById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        auditingDeleteSideEffectById (id:$id)
                        {
                            id
                            tags
                            modelPath
                            modelName
                            operationId
                            operationSort
                            accountId
                            email
                            event
                            auditableId
                            oldValue
                            newValue
                            ip
                            method
                            baseUrl
                            params
                            query
                            body
                            userAgent
                            isRollback
                            rollbackSideEffectId
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
                expect(res.body.data.auditingDeleteSideEffectById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await sideEffectRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
