import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[auFocus]',
    standalone: true,
})
export class FocusDirective implements AfterViewInit
{
    private initialized = false;
    private shouldFocus = false;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
    )
    {}

    @Input('auFocus')
    set auFocus(value: boolean | '' | 'true' | 'false' | undefined)
    {
        this.shouldFocus = value === '' || value === true || value === 'true';

        if (this.initialized)
        {
            this.queueFocus();
        }
    }

    ngAfterViewInit(): void
    {
        this.initialized = true;
        this.queueFocus();
    }

    private queueFocus(): void
    {
        if (!this.shouldFocus)
        {
            return;
        }

        if (typeof document === 'undefined')
        {
            return;
        }

        const element = this.elementRef.nativeElement;

        if (!element || typeof element.focus !== 'function')
        {
            return;
        }

        if (this.isDisabled(element))
        {
            return;
        }

        setTimeout(() =>
        {
            if (!element.isConnected || this.isDisabled(element))
            {
                return;
            }

            if (document.activeElement === element)
            {
                return;
            }

            element.focus({ preventScroll: true });
        });
    }

    private isDisabled(element: HTMLElement): boolean
    {
        return 'disabled' in element && Boolean((element as unknown as { disabled: boolean }).disabled);
    }
}
