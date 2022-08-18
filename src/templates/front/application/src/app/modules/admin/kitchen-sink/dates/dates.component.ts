
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Crumb, log, ViewDetailComponent } from '@aurora';
import * as dayjs from 'dayjs';

@Component({
    selector       : 'kitchen-sink-dates',
    templateUrl    : './dates.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatesComponent extends ViewDetailComponent
{
    // custom data
    currentActionId: string;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'kitchenSink.Dates' },
    ];

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
        /**/
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
            example4: ['2022-06-07', [Validators.required]],
            example5: ['2022-06-08', [Validators.required]],
            example6: ['', [Validators.required]],
            example7: ['', [Validators.required]],
            example8: ['', [Validators.required]],
        });
    }
}
