import { Directive, EventEmitter, Output, HostListener } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
    selector: '[auScrollEnd]',
})
export class ScrollEndDirective
{
    @Output() scrollEnd = new EventEmitter<void>();

    constructor(
        private matSelect: MatSelect,
    ) {}

    @HostListener(
        'openedChange',
        ['$event'],
    )
    openedChange(isOpen: boolean): void
    {
        if (isOpen)
        {
            this.matSelect
                .panel
                .nativeElement
                .addEventListener(
                    'scroll',
                    this.onScroll
                        .bind(this),
                    // add ScrollEndDirective scope
                    // with HostListener lose the scope
                );
        }
        else
        {
            if (this.matSelect.panel)
            {
                this.matSelect
                    .panel
                    .nativeElement
                    .removeEventListener(
                        'scroll',
                        this.onScroll,
                        // add ScrollEndDirective scope
                        // with HostListener lose the scope
                    );
            }
        }
    }

    @HostListener(
        'scroll',
        ['$event'],
    )
    onScroll(): void
    {
        const scrollTop = this.matSelect.panel.nativeElement.scrollTop;
        const scrollHeight = this.matSelect.panel.nativeElement.scrollHeight;
        const offsetHeight = this.matSelect.panel.nativeElement.offsetHeight;

        if (scrollTop + offsetHeight >= scrollHeight)
        {
            this.scrollEnd.emit();
        }
    }
}