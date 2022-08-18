import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations/public-api';

@Component({
    selector       : 'au-grid-search',
    templateUrl    : './grid-search.component.html',
    styles         : [':host { display: inline-block }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
})
export class GridSearchComponent implements OnInit {

    @Input() debounce: number = 300;
    @Input() minLength: number = 3;
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchOpen: EventEmitter<void> = new EventEmitter<void>();
    @Output() searchClose: EventEmitter<void> = new EventEmitter<void>();

    opened: boolean = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor() {}

    ngOnInit(): void
    {
        // Subscribe to the search field value changes
        this.searchControl
            .valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength
                filter(value => value && value.length >= this.minLength),
            )
            .subscribe(value => {
                this.search.emit(value);
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef)
    {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if ( value )
        {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {

                // Focus to the input element
                value.nativeElement.focus();
            });
        }
    }

    open(): void
    {
        // Return if it's already opened
        if (this.opened)
        {
            return;
        }

        // Open the search
        this.opened = true;

        // Emit events
        this.searchOpen.emit();
    }

    close(): void
    {
        // Return if it's already closed
        if (!this.opened)
        {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;

        // Emit events
        this.searchClose.emit();
    }
}
