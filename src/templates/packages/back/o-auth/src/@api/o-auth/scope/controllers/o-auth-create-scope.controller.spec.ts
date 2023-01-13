/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateScopeController } from './o-auth-create-scope.controller';
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthCreateScopeController', () =>
{
    let controller: OAuthCreateScopeController;
    let handler: OAuthCreateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateScopeController,
            ],
            providers: [
                {
                    provide : OAuthCreateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateScopeController>(OAuthCreateScopeController);
        handler = module.get<OAuthCreateScopeHandler>(OAuthCreateScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0])).toBe(scopes[0]);
        });
    });
});