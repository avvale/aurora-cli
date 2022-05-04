import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateScopesController } from './o-auth-create-scopes.controller';
import { OAuthCreateScopesHandler } from '../handlers/o-auth-create-scopes.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthCreateScopesController', () =>
{
    let controller: OAuthCreateScopesController;
    let handler: OAuthCreateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateScopesController,
            ],
            providers: [
                {
                    provide : OAuthCreateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateScopesController>(OAuthCreateScopesController);
        handler = module.get<OAuthCreateScopesHandler>(OAuthCreateScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scopes created', async () =>
        {
            expect(await controller.main(scopes)).toBe(undefined);
        });
    });
});