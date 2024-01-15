/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIScopeRepository, oAuthMockScopeData, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthUpdateScopeByIdService } from '@app/o-auth/scope/application/update/o-auth-update-scope-by-id.service';
import {
    OAuthScopeCode,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
} from '@app/o-auth/scope/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopeByIdService', () =>
{
    let service: OAuthUpdateScopeByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthUpdateScopeByIdService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthUpdateScopeByIdService);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a scope and emit event', async () =>
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
                ),
            ).toBe(undefined);
        });
    });
});
