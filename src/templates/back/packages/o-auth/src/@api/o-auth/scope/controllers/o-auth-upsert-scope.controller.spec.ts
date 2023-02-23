/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertScopeController } from './o-auth-upsert-scope.controller';
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpsertScopeController', () =>
{
    let controller: OAuthUpsertScopeController;
    let handler: OAuthUpsertScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpsertScopeController,
            ],
            providers: [
                {
                    provide : OAuthUpsertScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpsertScopeController>(OAuthUpsertScopeController);
        handler = module.get<OAuthUpsertScopeHandler>(OAuthUpsertScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpsertScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0])).toBe(scopes[0]);
        });
    });
});