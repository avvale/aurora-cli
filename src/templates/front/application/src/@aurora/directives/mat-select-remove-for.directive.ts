import { AfterViewInit, Directive, ElementRef } from '@angular/core';

// https://stackoverflow.com/questions/77316536/incorrect-use-of-label-for-form-element-angular-material
@Directive({
    selector  : 'mat-select',
    standalone: true,
})
export class MatSelectRemoveFor implements AfterViewInit
{
    constructor(
        private el: ElementRef,
    ) { }

    ngAfterViewInit(): void
    {
        setTimeout(() =>
        {
            // navigate to mat-mdc-form-field-flex to delete the for attribute
            const label = this.el.nativeElement.parentNode.parentNode.getElementsByTagName('label');
            if (label.length && label[0].getAttribute('for'))
                label[0].removeAttribute('for');
        });
    }

}