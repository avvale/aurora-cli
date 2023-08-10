/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteBoundedContextByIdHandler, IamDeleteBoundedContextByIdResolver } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextByIdResolver', () =>
{
    let resolver: IamDeleteBoundedContextByIdResolver;
    let handler: IamDeleteBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteBoundedContextByIdResolver,
                {
                    provide : IamDeleteBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeleteBoundedContextByIdResolver>(IamDeleteBoundedContextByIdResolver);
        handler = module.get<IamDeleteBoundedContextByIdHandler>(IamDeleteBoundedContextByIdHandler);
    });

    test('IamDeleteBoundedContextByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await resolver.main(iamMockBoundedContextData[0].id)).toBe(iamMockBoundedContextData[0]);
        });
    });
});
