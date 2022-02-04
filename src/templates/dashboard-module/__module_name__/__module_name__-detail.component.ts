
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, log, mapActions, Utils } from '@aurora';
import { ViewDetailComponent } from '@aurora/infrastructure/super/view-detail.component';
import { first, Observable, takeUntil } from 'rxjs';
import { {{ schema.aggregateName }} } from '../{{ toKebabCase schema.boundedContextName }}.types';
import { {{ toPascalCase schema.moduleName }}Service } from './{{ toKebabCase schema.moduleName }}.service';

@Component({
    selector       : '{{ toKebabCase schema.boundedContextName }}-{{ toKebabCase schema.moduleName }}-detail',
    templateUrl    : './{{ toKebabCase schema.moduleName }}-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class {{ toPascalCase schema.moduleName }}DetailComponent extends ViewDetailComponent
{
    // custom data
    {{ toCamelCase schema.moduleName }}$: Observable<{{ schema.aggregateName }}>;
    currentActionId: string;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleNames }}', routerLink: ['/{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']},
        { translation: '{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}' },
    ];

    constructor(
        protected injector: Injector,
        private {{ toCamelCase schema.moduleName }}Service: {{ toPascalCase schema.moduleName }}Service,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.actionService
            .action$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(action => this.onRunAction(action));
    }

    onSubmit(): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({ id: mapActions(this.currentActionId, { new: 'create', edit: 'update' }) });

        this.snackBar.open(
            this.translocoService.translate('{{ toCamelCase schema.boundedContextName }}.{{ toPascalCase schema.moduleName }}') + ' ' + this.translocoService.translate('Saved.M'),
            undefined,
            {
                verticalPosition: 'top',
                duration        : 3000,
            },
        );
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            {{#each schema.properties.formGroupFields}}
            {{#if (allowProperty ../schema.moduleName this) }}
            {{ toCamelCase name }}: [{{{initialFormGroupData .}}}, [{{#unless nullable }}Validators.required, {{/unless}}{{#if this.length}}Validators.minLength({{this.length }}), Validators.maxLength({{this.length}}), {{/if}}{{#if maxLength }}Validators.maxLength({{maxLength}}), {{/if}}]],
            {{/if}}
            {{/each}}
        });
    }

    onRunAction(action: Action): void
    {
        this.currentActionId = action.id;

        switch (this.currentActionId)
        {
            case 'new':
                if (this.fg.get('id')) this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'edit':
                this.{{ toCamelCase schema.moduleName }}Service
                    .{{ toCamelCase schema.moduleName }}$
                    .pipe(first())
                    .subscribe(item => this.fg.patchValue(item));
                break;

            case 'create':
                this.{{ toCamelCase schema.moduleName }}Service
                    .create<{{ schema.aggregateName }}>({ object: this.fg.value })
                    .subscribe();
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']);
                break;

            case 'update':
                this.{{ toCamelCase schema.moduleName }}Service
                    .update<{{ schema.aggregateName }}>({ object: this.fg.value })
                    .subscribe();
                this.router.navigate(['{{ toKebabCase schema.boundedContextName }}/{{ toKebabCase schema.moduleName }}']);
                break;
        }
    }
}
