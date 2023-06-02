/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindLangController } from './common-find-lang.controller';
import { CommonFindLangHandler } from '../handlers/common-find-lang.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';

describe('CommonFindLangController', () =>
{
    let controller: CommonFindLangController;
    let handler: CommonFindLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindLangController,
            ],
            providers: [
                {
                    provide : CommonFindLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindLangController>(CommonFindLangController);
        handler = module.get<CommonFindLangHandler>(CommonFindLangHandler);
    });

    describe('main', () =>
    {
        test('CommonFindLangController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a lang', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await controller.main()).toBe(langs[0]);
        });
    });
});