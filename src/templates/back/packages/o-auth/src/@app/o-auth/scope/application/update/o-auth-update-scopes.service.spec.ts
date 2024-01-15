/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIScopeRepository, oAuthMockScopeData, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthUpdateScopesService } from '@app/o-auth/scope/application/update/o-auth-update-scopes.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopesService', () =>
{
    let service: OAuthUpdateScopesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateScopesService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateScopesService);
    });

    describe('main', () =>
    {
        test('UpdateScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scopes and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new OAuthScopeId(oAuthMockScopeData[0].id),
                        code: new OAuthScopeCode(oAuthMockScopeData[0].code),
                        name: new OAuthScopeName(oAuthMockScopeData[0].name),
                        roleIds: new OAuthScopeRoleIds(oAuthMockScopeData[0].roleIds),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
