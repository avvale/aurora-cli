/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetApplicationsController } from './o-auth-get-applications.controller';
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthGetApplicationsController', () =>
{
    let controller: OAuthGetApplicationsController;
    let handler: OAuthGetApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetApplicationsController,
            ],
            providers: [
                {
                    provide : OAuthGetApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetApplicationsController>(OAuthGetApplicationsController);
        handler = module.get<OAuthGetApplicationsHandler>(OAuthGetApplicationsHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetApplicationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applications', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications)));
            expect(await controller.main()).toBe(applications);
        });
    });
});