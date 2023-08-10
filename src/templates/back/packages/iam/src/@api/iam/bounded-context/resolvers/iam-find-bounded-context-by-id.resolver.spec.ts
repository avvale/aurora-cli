/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindBoundedContextByIdHandler, IamFindBoundedContextByIdResolver } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextByIdResolver', () =>
{
    let resolver: IamFindBoundedContextByIdResolver;
    let handler: IamFindBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindBoundedContextByIdResolver,
                {
                    provide : IamFindBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindBoundedContextByIdResolver>(IamFindBoundedContextByIdResolver);
        handler = module.get<IamFindBoundedContextByIdHandler>(IamFindBoundedContextByIdHandler);
    });

    test('IamFindBoundedContextByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await resolver.main(iamMockBoundedContextData[0].id)).toBe(iamMockBoundedContextData[0]);
        });
    });
});
