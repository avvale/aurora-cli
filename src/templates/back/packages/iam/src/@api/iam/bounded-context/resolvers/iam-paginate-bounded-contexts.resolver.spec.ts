/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamPaginateBoundedContextsHandler,
    IamPaginateBoundedContextsResolver,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateBoundedContextsResolver', () => {
    let resolver: IamPaginateBoundedContextsResolver;
    let handler: IamPaginateBoundedContextsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateBoundedContextsResolver,
                {
                    provide: IamPaginateBoundedContextsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamPaginateBoundedContextsResolver>(
            IamPaginateBoundedContextsResolver,
        );
        handler = module.get<IamPaginateBoundedContextsHandler>(
            IamPaginateBoundedContextsHandler,
        );
    });

    test('IamPaginateBoundedContextsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateBoundedContextsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockBoundedContextData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockBoundedContextData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockBoundedContextData,
            });
        });
    });
});
