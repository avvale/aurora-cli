
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridData, ViewBaseComponent } from '@aurora';
import { combineLatest, map, Observable } from 'rxjs';
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
    gridTranslations$: Observable<any>;
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
                        id         : 'edit',
                        icon       : 'mode_edit',
                        translation: 'Edit',
                    },
                    {
                        id         : 'delete',
                        icon       : 'delete',
                        translation: 'Delete',
                    },
                ];
            },
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
        this.gridData$ = this.{{ toCamelCase schema.moduleName }}Service.pagination$;
        this.gridTranslations$ = combineLatest(
            {
                a: this.translocoService.selectTranslation(),
                b: this.translocoService.selectTranslation('{{ toKebabCase schema.boundedContextName }}'),
            })
            .pipe(
                map(res => ({ ...res.a, ...res.b })),
            );
    }

    handleColumnsConfigChanged($event): void
    {
        //
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
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/edit', action.data.event.row.id]);
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
                                .deleteById<{{ schema.aggregateName }}>(action.data.event.row.id)
                                .subscribe(item => this.{{ toCamelCase schema.moduleName }}Service.pagination().subscribe());
                        }
                    });
                break;
        }
    }
}
