
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridData, PageChangeEvent, ViewBaseComponent } from '@aurora';
import { Observable } from 'rxjs';
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
    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}' },
    ];
    gridData$: Observable<GridData<{{ schema.aggregateName }}>>;
    columnsConfig: ColumnConfig[] = [
        {
            type       : ColumnDataType.ACTIONS,
            field      : 'Actions',
            headerClass: 'w-32',
            sticky     : true,
            actions    : () =>
            {
                return [
                    {
                        id   : 'edit',
                        icon : 'mode_edit',
                        title: 'Edit',
                    },
                    {
                        id   : 'delete',
                        icon : 'delete',
                        title: 'Delete',
                    },
                ];
            },
        },
        {
            type : ColumnDataType.STRING,
            field: 'name',
            sort : 'name',
        },
        {
            type : ColumnDataType.STRING,
            field: 'ietf',
            sort : 'ietf',
        },
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
        this.gridData$ = this.{{ toCamelCase schema.moduleName }}Service.pagination$;
    }

    onRunAction(action: Action): void
    {
        this.currentActionId = action.id;

        switch (this.currentActionId)
        {
            case 'pagination':
                this.{{ toCamelCase schema.moduleName }}Service.pagination(action.data.event).subscribe();
                break;

            case 'edit':
                this.router.navigate(['common/{{ toKebabCase schema.moduleName }}/edit', action.data.event.row.id]);
                break;

            case 'delete':
                const dialogRef = this.confirmationService.open({
                    title  : 'Remove contact',
                    message: 'Are you sure you want to remove this contact permanently? <span class=\'font-medium\'>This action cannot be undone!</span>',
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: 'Remove',
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: 'Cancel',
                        },
                    },
                    dismissible: true,
                });

                dialogRef.afterClosed()
                    .subscribe(result =>
                    {
                        if (result === 'confirmed')
                        {
                            this.{{ toCamelCase schema.moduleName }}Service
                                .delete<{{ schema.aggregateName }}>(action.data.event.row.id)
                                .subscribe(item => this.{{ toCamelCase schema.moduleName }}Service.pagination().subscribe());
                        }
                    });
                break;
        }
    }
}
