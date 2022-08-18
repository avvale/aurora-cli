
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Crumb, log, ViewDetailComponent } from '@aurora';
import { Observable, of } from 'rxjs';
import { administrativeAreasLevel2 } from '../data/administrative-areas-level-2';

@Component({
    selector       : 'kitchen-sink-selects',
    templateUrl    : './selects.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsComponent extends ViewDetailComponent
{
    // custom data
    currentActionId: string;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.Selects' },
    ];

    data$: Observable<any>;

    constructor(
        protected injector: Injector,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        this.data$ = of(administrativeAreasLevel2);
    }

    onSubmit(): void
    {
        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg.value);
            this.validationMessagesService.validate();
            return;
        }

        log('[DEBUG] Error to validate form: ', this.fg.value);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            example1: ['', [Validators.required]],
            example2: ['', [Validators.required]],
            example3: ['', [Validators.required]],
        });
    }

    handleChangeSelect($event: MatOptionSelectionChange, administrativeAreaLevel2: any): void
    {
        // check that option has been changed bu user, and is the option selected
        if ($event.isUserInput && $event.source.selected)
        {
            log('[DEBUG] Option selected: ', administrativeAreaLevel2);
        }
    }
}
