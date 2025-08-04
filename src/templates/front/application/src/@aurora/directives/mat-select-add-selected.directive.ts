import { Directive, HostListener, Input, OnInit, WritableSignal } from '@angular/core';

@Directive({
    selector: '[auMatSelectAddSelectedDirective]',
})
export class MatSelectAddSelectedDirective implements OnInit
{
    @Input() value: string | number;
    @Input() object: any;
    @Input() selectedItems: WritableSignal<Map<any, any>>;

    ngOnInit(): void
    {
        if (!this.object)
        {
            throw new Error(`
                You have to define the object property together with the auMatSelectAddSelectedDirective.
                Indicating the object that will be selected.
            `);
        }

        if (!this.selectedItems)
        {
            throw new Error(`
                You have to define the selectedItems property together with the auMatSelectAddSelectedDirective.
                Indicating a WritableSignal that will contain the selected objects.
            `);
        }
    }

    @HostListener('onSelectionChange', ['$event'])
    onSelectionChange($event): void
    {
        if ($event.isUserInput)
        {
            if ($event.source.selected)
            {
                this.selectedItems.update(selectedItems => selectedItems.set(this.value, this.object));
            }
            else
            {
                this.selectedItems.update(selectedItems =>
                {
                    selectedItems.delete(this.value);
                    return selectedItems;
                });
            }
        }
    }
}