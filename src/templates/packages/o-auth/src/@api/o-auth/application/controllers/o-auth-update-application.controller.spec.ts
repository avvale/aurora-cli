/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationController } from './o-auth-update-application.controller';
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationController', () =>
{
    let controller: OAuthUpdateApplicationController;
    let handler: OAuthUpdateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateApplicationController,
            ],
            providers: [
                {
                    provide : OAuthUpdateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateApplicationController>(OAuthUpdateApplicationController);
        handler = module.get<OAuthUpdateApplicationHandler>(OAuthUpdateApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});