import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GridActionsMenuMessages, GridMessages, GridOperatorsMessages, GridPaginatorMessages } from '../grid.types';

@Injectable({
    providedIn: 'root',
})
export class GridTranslationsService
{
    // custom messages
    columnMessages: { [key: string]: { [key: string]: BehaviorSubject<string>; }; } = {};
    actionsMenuMessages: { [key: string]: BehaviorSubject<{ [key: string]: string; }>; } = {};
    messages: { [key: string]: GridMessages; } = {};
    defaultOperatorsMessages: GridOperatorsMessages = {
        contains        : 'Contains',
        endsWith        : 'Ends with',
        equals          : 'Equal to',
        greaterThan     : 'Greater than',
        greaterThanEqual: 'Greater than equal',
        lessThan        : 'Less than',
        lessThanEqual   : 'Less than equal',
        notEquals       : 'Not equal to',
        startsWith      : 'Starts with',
    };
    operatorsMessages: { [key: string]: BehaviorSubject<GridOperatorsMessages>; } = {};
    defaultPaginatorMessages: GridPaginatorMessages = {
        firstPageLabel   : 'First page',
        itemsPerPageLabel: 'Items per page',
        lastPageLabel    : 'Last page',
        nextPageLabel    : 'Next page',
        ofLabel          : 'of',
        previousPageLabel: 'Previous page',
    };
    // paginator messages doesn't work scope functionality,
    // can't pass scope variable to PaginatorIntlService
    // from mat-paginator component
    paginatorMessages: { [key: string]:  BehaviorSubject<GridPaginatorMessages>; } = {};

    private checkColumnMessage(scope: string): void
    {
        if (!this.columnMessages[scope])
        {
            this.columnMessages[scope] = {};
        }
    }

    private createDefaultMessages(): GridMessages
    {
        // return new instance to avoid reference
        return {
            actions           : new BehaviorSubject<string>('Actions'),
            AND               : new BehaviorSubject<string>('AND'),
            clearFilters      : new BehaviorSubject<string>('Clear filters'),
            clickAndDragInfo  : new BehaviorSubject<string>('Click on a column and drag it to change its position'),
            columns           : new BehaviorSubject<string>('Columns'),
            field             : new BehaviorSubject<string>('Field'),
            filter            : new BehaviorSubject<string>('Filter'),
            noData            : new BehaviorSubject<string>('No data to show'),
            operator          : new BehaviorSubject<string>('Operator'),
            OR                : new BehaviorSubject<string>('OR'),
            pleaseSelectField : new BehaviorSubject<string>('Please select a field'),
            resetColumnsConfig: new BehaviorSubject<string>('Reset columns config'),
            search            : new BehaviorSubject<string>('Search'),
            translations      : new BehaviorSubject<string>('Translations'),
            value             : new BehaviorSubject<string>('Value'),
        };
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

    private checkMessage(scope: string): void
    {
        if (!this.messages[scope])
        {
            this.messages[scope] = this.createDefaultMessages();
        }
    }

    setMessage(scope: string, key: keyof GridMessages, message: string): void
    {
        this.checkMessage(scope);
        this.messages[scope][key].next(message);
    }

    getMessage(scope: string, key: keyof GridMessages): Observable<string>
    {
        this.checkMessage(scope);
        return this.messages[scope][key]?.asObservable();
    }

    private checkPaginatorMessages(scope: string): void
    {
        if (!this.paginatorMessages[scope])
        {
            this.paginatorMessages[scope] = new BehaviorSubject<GridPaginatorMessages>({ ...this.defaultPaginatorMessages });
        }
    }

    setPaginatorMessages(scope: string, paginatorMessages: GridPaginatorMessages): void
    {
        this.checkPaginatorMessages(scope);
        this.paginatorMessages[scope].next({ ...this.defaultPaginatorMessages, ...paginatorMessages });
    }

    getPaginatorMessages(scope: string): Observable<GridPaginatorMessages>
    {
        this.checkPaginatorMessages(scope);
        return this.paginatorMessages[scope]?.asObservable();
    }

    private checkOperatorsMessages(scope: string): void
    {
        if (!this.operatorsMessages[scope])
        {
            this.operatorsMessages[scope] = new BehaviorSubject<GridOperatorsMessages>({ ...this.defaultOperatorsMessages });
        }
    }

    setOperatorsMessages(scope: string, operatorMessages: GridOperatorsMessages): void
    {
        this.checkOperatorsMessages(scope);
        this.operatorsMessages[scope].next({ ...this.defaultOperatorsMessages, ...operatorMessages });
    }

    getOperatorsMessages(scope: string): Observable<GridOperatorsMessages>
    {
        this.checkOperatorsMessages(scope);
        return this.operatorsMessages[scope]?.asObservable();
    }

    // actions menu messages
    private checkActionsMenuMessages(scope: string): void
    {
        if (!(this.actionsMenuMessages[scope] instanceof BehaviorSubject))
        {
            this.actionsMenuMessages[scope] = new BehaviorSubject<{ [key: string]: string; }>({});
        }
    }

    setActionsMenuMessages(scope: string, actionsMenuMessage: GridActionsMenuMessages): void
    {
        this.checkActionsMenuMessages(scope);

        this.actionsMenuMessages[scope].next(actionsMenuMessage);
    }

    getActionsMenuMessages(scope: string): Observable<GridActionsMenuMessages>
    {
        this.checkActionsMenuMessages(scope);

        return this.actionsMenuMessages[scope]?.asObservable();
    }
}
