import { Directive, ElementRef, EventEmitter, Input, Optional, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Directive({
    selector  : '[auSlug]',
    standalone: true,
})
export class SlugDirective
{
    @Input() formControlName: string;
    @Input() debounceTime: number = 250;

    @Output() slug = new EventEmitter<string>();

    constructor(
        private element: ElementRef,
        @Optional() private controlContainer: ControlContainer,
    )
    {
        fromEvent(this.element.nativeElement, 'change')
            .pipe(
                takeUntilDestroyed(),
                debounceTime(this.debounceTime),
                distinctUntilChanged(),
                switchMap(async(event: any) => event.target.value),
            )
            .subscribe((slug: string) =>
            {
                this.slug.emit(slug);
            });
    }

    get form(): FormGroup
    {
        return this.controlContainer.control as FormGroup;
    }

    get control(): FormControl
    {
        return this.form.get(this.formControlName) as FormControl;
    }
}
