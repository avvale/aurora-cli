import { ColumnConfig, ColumnDataType, GridSearchState } from '@aurora';
import { Operator, QueryStatement } from './sql-statement';
import { queryStatementHandler } from './query-statement-handler';

describe('QueryStatementHandler', () =>
{
    const usernameColumn: ColumnConfig = {
        type: ColumnDataType.STRING,
        field: 'username',
        searchable: true,
    };

    const userNameColumn: ColumnConfig = {
        type: ColumnDataType.STRING,
        field: 'user.name',
        searchableField: '$user.name$',
        searchable: true,
    };

    const userCountryNameColumn: ColumnConfig = {
        type: ColumnDataType.STRING,
        field: 'user.country.name',
        searchableField: '$user.country.name$',
        searchable: true,
    };

    const surnameColumn: ColumnConfig = {
        type: ColumnDataType.STRING,
        field: 'user.surname',
        searchableField: '$user.surname$',
        searchable: true,
    };

    const openSearch = (value: string): GridSearchState => ({
        value,
        isOpen: true,
    });

    it('should keep query statement untouched when search dialog is closed', () =>
    {
        const handler = queryStatementHandler({
            queryStatement: {},
            columnsConfig: [usernameColumn],
        });

        handler.setSearch({ value: 'carlos', isOpen: false });

        expect(handler.getQueryStatement()).toEqual({});
    });

    it('should set direct search statements on the top-level where clause', () =>
    {
        const handler = queryStatementHandler({
            queryStatement: {},
            columnsConfig: [usernameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        expect(handler.getQueryStatement()).toEqual({
            where: {
                [Operator.or]: [
                    {
                        username: {
                            [Operator.iLike]: '%carlos%',
                        },
                    },
                ],
            },
        } satisfies QueryStatement);
    });

    it('should build include tree when only relation columns participate in search', () =>
    {
        const handler = queryStatementHandler({
            queryStatement: {},
            columnsConfig: [userNameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        expect(handler.getQueryStatement()).toEqual({
            include: [
                {
                    association: 'user',
                    where: {
                        [Operator.or]: [
                            {
                                '$user.name$': {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                        ],
                    },
                },
            ],
        } satisfies QueryStatement);
    });

    it('should split direct and relation statements across where and include', () =>
    {
        const handler = queryStatementHandler({
            queryStatement: {},
            columnsConfig: [usernameColumn, userNameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        expect(handler.getQueryStatement()).toEqual({
            where: {
                [Operator.or]: [
                    {
                        username: {
                            [Operator.iLike]: '%carlos%',
                        },
                    },
                ],
            },
            include: [
                {
                    association: 'user',
                    where: {
                        [Operator.or]: [
                            {
                                '$user.name$': {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                        ],
                    },
                },
            ],
        } satisfies QueryStatement);
    });

    it('should create nested includes for deep relation search fields', () =>
    {
        const handler = queryStatementHandler({
            queryStatement: {},
            columnsConfig: [usernameColumn, userNameColumn, userCountryNameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        const expected: QueryStatement = {
            where: {
                [Operator.or]: [
                    {
                        username: {
                            [Operator.iLike]: '%carlos%',
                        },
                    },
                ],
            },
            include: [
                {
                    association: 'user',
                    where: {
                        [Operator.or]: [
                            {
                                '$user.name$': {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                        ],
                    },
                    include: [
                        {
                            association: 'country',
                            where: {
                                [Operator.or]: [
                                    {
                                        '$user.country.name$': {
                                            [Operator.iLike]: '%carlos%',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        };

        expect(handler.getQueryStatement()).toEqual(expected);
    });

    it('should keep existing where statements by wrapping them in an [Operator.and] block', () =>
    {
        const initialStatement: QueryStatement = {
            where: {
                isActive: true,
            },
        };

        const handler = queryStatementHandler({
            queryStatement: initialStatement,
            columnsConfig: [usernameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        expect(handler.getQueryStatement()).toEqual({
            where: {
                [Operator.and]: [
                    {
                        isActive: true,
                    },
                    {
                        [Operator.or]: [
                            {
                                username: {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                        ],
                    },
                ],
            },
        } satisfies QueryStatement);
    });

    it('should merge relation filters into existing include definitions', () =>
    {
        const existingInclude = {
            association: 'user',
            include: [
                {
                    association: 'profile',
                    where: {
                        [Operator.or]: [
                            {
                                '$user.profile.bio$': {
                                    [Operator.iLike]: '%bio%',
                                },
                            },
                        ],
                    },
                },
            ],
        };

        const initialStatement: QueryStatement = {
            include: existingInclude,
        };

        const handler = queryStatementHandler({
            queryStatement: initialStatement,
            columnsConfig: [userNameColumn, surnameColumn],
        });

        handler.setSearch(openSearch('carlos'));

        expect(handler.getQueryStatement()).toEqual({
            include: [
                {
                    association: 'user',
                    where: {
                        [Operator.or]: [
                            {
                                '$user.name$': {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                            {
                                '$user.surname$': {
                                    [Operator.iLike]: '%carlos%',
                                },
                            },
                        ],
                    },
                    include: [
                        {
                            association: 'profile',
                            where: {
                                [Operator.or]: [
                                    {
                                        '$user.profile.bio$': {
                                            [Operator.iLike]: '%bio%',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        } satisfies QueryStatement);
    });
});

