/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindTagHandler, IamFindTagResolver } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagResolver', () =>
{
    let resolver: IamFindTagResolver;
    let handler: IamFindTagHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTagResolver,
                {
                    provide : IamFindTagHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindTagResolver>(IamFindTagResolver);
        handler = module.get<IamFindTagHandler>(IamFindTagHandler);
    });

    test('IamFindTagResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTagResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tag', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(await resolver.main()).toBe(iamMockTagData[0]);
        });
    });
});
