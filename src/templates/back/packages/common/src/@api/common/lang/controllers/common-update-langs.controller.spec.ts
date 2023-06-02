/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangsController } from './common-update-langs.controller';
import { CommonUpdateLangsHandler } from '../handlers/common-update-langs.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

describe('CommonUpdateLangsController', () =>
{
    let controller: CommonUpdateLangsController;
    let handler: CommonUpdateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateLangsController,
            ],
            providers: [
                {
                    provide : CommonUpdateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateLangsController>(CommonUpdateLangsController);
        handler = module.get<CommonUpdateLangsHandler>(CommonUpdateLangsHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a langs updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main(langs[0])).toBe(langs[0]);
        });
    });
});