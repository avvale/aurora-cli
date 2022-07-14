import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridData, setQueryFilters, ViewBaseComponent } from '@aurora';
import { combineLatest, lastValueFrom, map, Observable, takeUntil } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';

@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-list',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.moduleName }}ListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}' },
    ];
    gridData$: Observable<GridData<{{ schema.aggregateName }}>>;
    columnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        {{#each schema.properties.gridFields}}
        {{#if (allowProperty ../schema.moduleName this) }}
        {
            type : ColumnDataType.STRING,
            field: '{{ toCamelCase name }}',
            sort : '{{ toCamelCase name }}',
        },
        {{/if}}
        {{/each}}
    ];

    constructor(
        protected injector: Injector,
        private {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    )
    {
        super(injector);
    }

    ngOnInit(): void
    {
        this.actionService
            .action$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(action => this.handleAction(action));

        this.gridData$ = this.{{ toCamelCase schema.moduleName }}Service.pagination$;
    }

    handleStateChange($event): void
    {
        this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination', isViewAction: false, data: { event: setQueryFilters($event) }});
    }

    handleGridAction(action: Action): void
    {
        this.actionService.action(action);
    }

    private async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination':
                await lastValueFrom(this.{{ toCamelCase schema.moduleName }}Service.pagination(action.data.event));
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.edit':
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/edit', action.data.row.id]);
                break;

            case '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.delete':
                const dialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                dialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            await lastValueFrom(
                                this.{{ toCamelCase schema.moduleName }}Service
                                    .deleteById<{{ schema.aggregateName }}>(action.data.row.id),
                            );
                            this.actionService.action({ id: '{{ toCamelCase schema.boundedContextName }}::{{ toCamelCase schema.moduleName }}.list.pagination' });
                        }
                    });
                break;
        }
    }
}
