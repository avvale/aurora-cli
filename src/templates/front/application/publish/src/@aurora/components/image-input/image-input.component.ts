import { ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'au-image-input',
    template: `
        <img
            [src]="taggedSrc"
            [class]="imgClass"
            [style]="imgStyle"
        >
    `,
    providers: [
        {
            provide    : NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageInputComponent),
            multi      : true,
        },
    ],
    standalone: true,
})
export class ImageInputComponent implements ControlValueAccessor
{
    @Input('imgClass') imgClass;
    @Input('imgStyle') imgStyle;

    taggedSrc: string;
    private originSrc: string;
    get src(): string
    {
        return this.originSrc;
    }

    private propagateChange: (value: any) => void;
    private onTouched: () => void;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
    ) {}

    writeValue(value: string): void
    {
        if (value !== undefined)
        {
            this.originSrc = value;
            this.refresh();
        }
    }

    // registers a callback function is called by the forms API on initialization
    registerOnChange(fn: (value: any) => void): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouched = fn;
    }

    refresh(): void
    {
        this.taggedSrc = `${this.originSrc}?${Math.random()}`;

        // call changeDetector to render the new value
        this.changeDetector.markForCheck();
    }
}
