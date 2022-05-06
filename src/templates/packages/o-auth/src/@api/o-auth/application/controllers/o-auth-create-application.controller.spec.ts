/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationController } from './o-auth-create-application.controller';
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationController', () =>
{
    let controller: OAuthCreateApplicationController;
    let handler: OAuthCreateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateApplicationController,
            ],
            providers: [
                {
                    provide : OAuthCreateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthCreateApplicationController>(OAuthCreateApplicationController);
        handler = module.get<OAuthCreateApplicationHandler>(OAuthCreateApplicationHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await controller.main(applications[0])).toBe(applications[0]);
        });
    });
});