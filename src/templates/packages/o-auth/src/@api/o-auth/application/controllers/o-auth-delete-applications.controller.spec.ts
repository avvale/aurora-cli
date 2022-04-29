/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationsController } from './o-auth-delete-applications.controller';
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationsController', () =>
{
    let controller: OAuthDeleteApplicationsController;
    let handler: OAuthDeleteApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthDeleteApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteApplicationsController>(OAuthDeleteApplicationsController);
        handler = module.get<OAuthDeleteApplicationsHandler>(OAuthDeleteApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an applications deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await controller.main()).toBe(applications);
        });
    });
});