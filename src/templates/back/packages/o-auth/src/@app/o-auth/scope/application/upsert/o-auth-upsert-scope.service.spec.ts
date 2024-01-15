/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIScopeRepository, oAuthMockScopeData, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthUpsertScopeService } from '@app/o-auth/scope/application/upsert/o-auth-upsert-scope.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertScopeService', () =>

{
    let service: OAuthUpsertScopeService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpsertScopeService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpsertScopeService);
    });

    describe('main', () =>
    {
        test('OAuthUpsertScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a scope and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthScopeId(oAuthMockScopeData[0].id),
                        code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                        name: new OAuthScopeName(oAuthMockScopeData[0].name),
                        roleIds: new OAuthScopeRoleIds(oAuthMockScopeData[0].roleIds),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
