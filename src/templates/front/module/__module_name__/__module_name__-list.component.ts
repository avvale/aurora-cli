import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, GridData, setQueryFilters, ViewBaseComponent } from '@aurora';
import { combineLatest, lastValueFrom, map, Observable } from 'rxjs';
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
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id  : 'edit',
                        icon: 'mode_edit',
                    },
                    {
                        id  : 'delete',
                        icon: 'delete',
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

    handleStateChange($event): void
    {
        this.onRunAction({ id: 'pagination', data: { event: setQueryFilters($event) }});
    }

    async onRunAction(action: Action, properties: { pure: boolean; } = { pure: false }): Promise<void>
    {
        if (!properties.pure) this.currentActionId = action.id;

        switch (action.id)
        {
            case 'pagination':
                await lastValueFrom(this.{{ toCamelCase schema.moduleName }}Service.pagination(action.data.event));
                break;

            case 'edit':
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}/edit', action.data.event.row.id]);
                break;

            case 'delete':
                const dialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}')}`,
                    message: this.translocoService.translate('Deletion-Warning', { entity: this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') }),
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
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            await lastValueFrom(
                                this.{{ toCamelCase schema.moduleName }}Service
                                    .deleteById<{{ schema.aggregateName }}>(action.data.event.row.id),
                            );
                            await lastValueFrom(this.{{ toCamelCase schema.moduleName }}Service.pagination());
                        }
                    });
                break;
        }
    }
}
