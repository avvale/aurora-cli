import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridActionMenuMessages, GridMessages, GridOperatorMessages, GridPaginatorMessages } from '../grid.types';

@Injectable({
    providedIn: 'root',
})
export class GridTranslationsService
{
    // custom messages
    defaultGridScope = 'defaultGridScope';
    columnMessages: { [key: string]: { [key: string]: BehaviorSubject<string>; }; } = {};

    // storages for messages
    messages: { [key: string]: GridMessages; } = {};
    operatorMessages: { [key: string]: GridOperatorMessages; } = {};
    paginatorMessages: { [key: string]: GridPaginatorMessages; } = {};
    actionMenuMessages: { [key: string]: GridActionMenuMessages; } = {};

    private checkColumnMessage(scope: string): void
    {
        if (!this.columnMessages[scope])
        {
            this.columnMessages[scope] = {};
        }
    }

    private createDefaultMessage(key: keyof GridMessages): BehaviorSubject<string>
    {
        switch (key)
        {
            case 'actions':
                return new BehaviorSubject<string>('Actions');
            case 'AND':
                return new BehaviorSubject<string>('AND');
            case 'clearFilters':
                return new BehaviorSubject<string>('Clear filters');
            case 'clickAndDragInfo':
                return new BehaviorSubject<string>('Click on a column and drag it to change its position');
            case 'columns':
                return new BehaviorSubject<string>('Columns');
            case 'field':
                return new BehaviorSubject<string>('Field');
            case 'filter':
                return new BehaviorSubject<string>('Filter');
            case 'find':
                return new BehaviorSubject<string>('Find');
            case 'noData':
                return new BehaviorSubject<string>('No data to show');
            case 'noResultsFound':
                return new BehaviorSubject<string>('No results found');
            case 'operator':
                return new BehaviorSubject<string>('Operator');
            case 'OR':
                return new BehaviorSubject<string>('OR');
            case 'pleaseSelectField':
                return new BehaviorSubject<string>('Please select a field');
            case 'resetColumnsConfig':
                return new BehaviorSubject<string>('Reset columns config');
            case 'search':
                return new BehaviorSubject<string>('Search');
            case 'selectedOptions':
                return new BehaviorSubject<string>('Selected options');
            case 'translations':
                return new BehaviorSubject<string>('Translations');
            case 'value':
                return new BehaviorSubject<string>('Value');
        }
    }

    private createDefaultOperatorMessage(key: keyof GridOperatorMessages): BehaviorSubject<string>
    {
        switch (key)
        {
            case 'contains':
                return new BehaviorSubject<string>('Contains');
            case 'containsAny':
                return new BehaviorSubject<string>('Contains any');
            case 'endsWith':
                return new BehaviorSubject<string>('Ends with');
            case 'equals':
                return new BehaviorSubject<string>('Equal to');
            case 'greaterThan':
                return new BehaviorSubject<string>('Greater than');
            case 'greaterThanEqual':
                return new BehaviorSubject<string>('Greater than equal');
            case 'lessThan':
                return new BehaviorSubject<string>('Less than');
            case 'lessThanEqual':
                return new BehaviorSubject<string>('Less than equal');
            case 'mustContain':
                return new BehaviorSubject<string>('Must contain');
            case 'notEquals':
                return new BehaviorSubject<string>('Not equal to');
            case 'startsWith':
                return new BehaviorSubject<string>('Starts with');
        }
    }

    private createDefaultPaginatorMessage(key: keyof GridPaginatorMessages): BehaviorSubject<string>
    {
        switch (key)
        {
            case 'firstPageLabel':
                return new BehaviorSubject<string>('First page');
            case 'itemsPerPageLabel':
                return new BehaviorSubject<string>('Items per page');
            case 'lastPageLabel':
                return new BehaviorSubject<string>('Last page');
            case 'nextPageLabel':
                return new BehaviorSubject<string>('Next page');
            case 'ofLabel':
                return new BehaviorSubject<string>('of');
            case 'previousPageLabel':
                return new BehaviorSubject<string>('of');
        }
    }

    private createDefaultActionMenuMessage(key: keyof GridActionMenuMessages): BehaviorSubject<string>
    {
        switch (key)
        {
            case 'edit':
                return new BehaviorSubject<string>('Edit');
            case 'delete':
                return new BehaviorSubject<string>('Delete');
            default:
                return new BehaviorSubject<string>('');
        }
    }

    setColumnMessage(scope: string, key: string, message: string): void
    {
        this.checkColumnMessage(scope);

        if (this.columnMessages[scope][key] instanceof BehaviorSubject)
        {
            this.columnMessages[scope][key].next(message);
        }
        else
        {
            this.columnMessages[scope][key] = new BehaviorSubject<string>(message);
        }
    }

    getColumnMessage(scope: string, key: string): Observable<string>
    {
        this.checkColumnMessage(scope);

        // always must be create instance of before return
        if (this.columnMessages[scope][key] instanceof BehaviorSubject)
        {
            return this.columnMessages[scope][key];
        }
        else
        {
            // set key like default value
            this.columnMessages[scope][key] = new BehaviorSubject<string>(key);
            return this.columnMessages[scope][key];
        }
    }

    getInstantColumnMessages(scope: string): { [key: string]: string; }
    {
        const instantMessages = {};
        for (const [key, value] of Object.entries(this.columnMessages[scope]))
        {
            instantMessages[key] = value.getValue();
        }
        return instantMessages;
    }

    /* #region messages */
    private checkMessage(key: keyof GridMessages, scope: string): void
    {
        if (!this.messages[scope] || !this.messages[scope][key])
        {
            this.messages[scope] = {
                ...this.messages[scope],
                [key]: this.createDefaultMessage(key),
            };
        }
    }

    private hasMessage(key: keyof GridMessages, scope: string): boolean
    {
        if (!this.messages[scope])
        {
            return false;
        }
        return !!this.messages[scope][key];
    }

    setMessage(
        key: keyof GridMessages,
        message: string,
        scope: string = 'defaultGridScope',
    ): void
    {
        this.checkMessage(key, scope);
        this.messages[scope][key].next(message);
    }

    getMessage(
        key: keyof GridMessages,
        scope: string = 'defaultGridScope',
    ): Observable<string>
    {
        // check custom message
        if (this.hasMessage(key, scope))
            return this.messages[scope][key]?.asObservable();

        // check default message
        if (this.hasMessage(key, this.defaultGridScope))
            return this.messages[this.defaultGridScope][key]?.asObservable();

        // return fallback message
        return this.createDefaultMessage(key).asObservable();
    }
    /* #endregion messages */

    /* #region operators messages */
    private checkOperatorMessage(key: keyof GridOperatorMessages, scope: string): void
    {
        if (!this.operatorMessages[scope] || !this.operatorMessages[scope][key])
        {
            this.operatorMessages[scope] = {
                ...this.operatorMessages[scope],
                [key]: this.createDefaultOperatorMessage(key),
            };
        }
    }

    private hasOperatorMessage(key: keyof GridOperatorMessages, scope: string): boolean
    {
        if (!this.operatorMessages[scope])
        {
            return false;
        }
        return !!this.operatorMessages[scope][key];
    }

    setOperatorMessages(
        scope: string,
        operatorMessages: { [key in keyof GridOperatorMessages]: string; },
    ): void
    {
        for (const operatorKey of Object.keys(operatorMessages))
        {
            this.setOperatorMessage(
                operatorKey as keyof GridOperatorMessages,
                operatorMessages[operatorKey],
                scope,
            );
        }
    }

    setOperatorMessage(
        key: keyof GridOperatorMessages,
        message: string,
        scope: string = 'defaultGridScope',
    ): void
    {
        this.checkOperatorMessage(key, scope);
        this.operatorMessages[scope][key].next(message);
    }

    getOperatorMessage(
        key: keyof GridOperatorMessages,
        scope: string = 'defaultGridScope',
    ): Observable<string>
    {
        // check custom message
        if (this.hasOperatorMessage(key, scope))
            return this.operatorMessages[scope][key]?.asObservable();

        // check default message
        if (this.hasOperatorMessage(key, this.defaultGridScope))
            return this.operatorMessages[this.defaultGridScope][key]?.asObservable();

        // return fallback message
        return this.createDefaultOperatorMessage(key).asObservable();
    }
    /* #endregion operators messages */

    /* #region paginator messages */
    private checkPaginatorMessage(key: keyof GridPaginatorMessages, scope: string): void
    {
        if (!this.paginatorMessages[scope] || !this.paginatorMessages[scope][key])
        {
            this.paginatorMessages[scope] = {
                ...this.paginatorMessages[scope],
                [key]: this.createDefaultPaginatorMessage(key),
            };
        }
    }

    private hasPaginatorMessage(key: keyof GridPaginatorMessages, scope: string): boolean
    {
        if (!this.paginatorMessages[scope])
        {
            return false;
        }
        return !!this.paginatorMessages[scope][key];
    }

    setPaginatorMessages(
        // paginator translations are set with provider in src/@aurora/aurora.provider.ts, can't to have scope
        scope: string,
        paginatorMessages: { [key in keyof GridPaginatorMessages]: string; },
    ): void
    {
        for (const paginatorKey of Object.keys(paginatorMessages))
        {
            this.setPaginatorMessage(
                paginatorKey as keyof GridPaginatorMessages,
                paginatorMessages[paginatorKey],
                this.defaultGridScope,
            );
        }
    }

    setPaginatorMessage(
        key: keyof GridPaginatorMessages,
        message: string,
        scope: string = 'defaultGridScope',
    ): void
    {
        this.checkPaginatorMessage(key, scope);
        this.paginatorMessages[scope][key].next(message);
    }

    getPaginatorMessage(
        key: keyof GridPaginatorMessages,
        scope: string = 'defaultGridScope',
    ): Observable<string>
    {
        // check custom message
        // paginator translations are set with provider in src/@aurora/aurora.provider.ts, can't to have scope
        if (this.hasPaginatorMessage(key, this.defaultGridScope))
            return this.paginatorMessages[this.defaultGridScope][key]?.asObservable();

        // check default message
        if (this.hasPaginatorMessage(key, this.defaultGridScope))
            return this.paginatorMessages[this.defaultGridScope][key]?.asObservable();

        // return fallback message
        return this.createDefaultPaginatorMessage(key).asObservable();
    }
    /* #endregion paginator messages */

    /* #region action menu messages */
    private checkActionMenuMessage(key: keyof GridActionMenuMessages, scope: string): void
    {
        if (!this.actionMenuMessages[scope] || !this.actionMenuMessages[scope][key])
        {
            this.actionMenuMessages[scope] = {
                ...this.actionMenuMessages[scope],
                [key]: this.createDefaultActionMenuMessage(key),
            };
        }
    }

    private hasActionMenuMessage(key: keyof GridActionMenuMessages, scope: string): boolean
    {
        if (!this.actionMenuMessages[scope])
        {
            return false;
        }
        return !!this.actionMenuMessages[scope][key];
    }

    setActionMenuMessages(
        scope: string,
        actionMenuMessages: { [key in keyof GridActionMenuMessages]: string; },
    ): void
    {
        for (const actionMenuKey of Object.keys(actionMenuMessages))
        {
            this.setActionMenuMessage(
                actionMenuKey as keyof GridActionMenuMessages,
                actionMenuMessages[actionMenuKey],
                scope,
            );
        }
    }

    setActionMenuMessage(
        key: keyof GridActionMenuMessages,
        message: string,
        scope: string = 'defaultGridScope',
    ): void
    {
        this.checkActionMenuMessage(key, scope);
        this.actionMenuMessages[scope][key].next(message);
    }

    getActionMenuMessage(
        key: keyof GridActionMenuMessages,
        scope: string = 'defaultGridScope',
    ): Observable<string>
    {
        // check custom message
        if (this.hasActionMenuMessage(key, scope))
            return this.actionMenuMessages[scope][key]?.asObservable();

        // check default message
        if (this.hasActionMenuMessage(key, this.defaultGridScope))
            return this.actionMenuMessages[this.defaultGridScope][key]?.asObservable();

        // return fallback message
        return this.createDefaultActionMenuMessage(key).asObservable();
    }





    /* private checkActionsMenuMessages(scope: string): void
    {
        if (!(this.actionsMenuMessages[scope] instanceof BehaviorSubject))
        {
            this.actionsMenuMessages[scope] = new BehaviorSubject<{ [key: string]: string; }>({});
        }
    }

    setActionsMenuMessages(scope: string, actionsMenuMessage: GridActionMenuMessages): void
    {
        this.checkActionsMenuMessages(scope);

        this.actionsMenuMessages[scope].next(actionsMenuMessage);
    }

    getActionsMenuMessages(scope: string): Observable<GridActionMenuMessages>
    {
        this.checkActionsMenuMessages(scope);

        return this.actionsMenuMessages[scope]?.asObservable();
    } */
    /* #endregion action messages */
}
