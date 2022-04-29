/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationController } from './o-auth-find-application.controller';
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthFindApplicationController', () =>
{
    let controller: OAuthFindApplicationController;
    let handler: OAuthFindApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindApplicationController,
            ],
            providers: [
                {
                    provide : OAuthFindApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindApplicationController>(OAuthFindApplicationController);
        handler = module.get<OAuthFindApplicationHandler>(OAuthFindApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main()).toBe(applications[0]);
        });
    });
});