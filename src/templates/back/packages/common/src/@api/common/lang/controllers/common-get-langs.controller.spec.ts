/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetLangsController } from './common-get-langs.controller';
import { CommonGetLangsHandler } from '../handlers/common-get-langs.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonGetLangsController', () =>
{
    let controller: CommonGetLangsController;
    let handler: CommonGetLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetLangsController,
            ],
            providers: [
                {
                    provide : CommonGetLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetLangsController>(CommonGetLangsController);
        handler = module.get<CommonGetLangsHandler>(CommonGetLangsHandler);
    });

    describe('main', () =>
    {
        test('CommonGetLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a langs', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs)));
            expect(await controller.main()).toBe(langs);
        });
    });
});