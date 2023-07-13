import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations/public-api';
import { Subject, debounceTime, filter, map, takeUntil } from 'rxjs';
import { GridSearchState } from '../grid.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GridTranslatePipe } from '../grid-translations/grid-translate.pipe';

@Component({
    selector       : 'au-grid-search',
    templateUrl    : './grid-search.component.html',
    styles         : [':host { display: inline-block }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [AsyncPipe, GridTranslatePipe, NgIf, NgForOf, MatButtonModule, MatIconModule, ReactiveFormsModule],
})
export class GridSearchComponent implements OnInit
{
    @Input() debounce: number = 300;
    @Input() minLength: number = 3;
    @Input() value: string;
    @Input() isOpen: boolean = false;
    @Input() searchState: GridSearchState;
    @Output() search: EventEmitter<GridSearchState> = new EventEmitter<GridSearchState>();
    @Output() searchChange: EventEmitter<GridSearchState> = new EventEmitter<GridSearchState>();

    opened: boolean = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    private unsubscribeAll$: Subject<void> = new Subject<void>();

    ngOnInit(): void
    {
        // set initial state
        if (this.searchState?.value) this.searchControl.setValue(this.searchState.value);
        if (this.searchState?.isOpen) this.open();

        // Subscribe to the search field value changes
        this.searchControl
            .valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this.unsubscribeAll$),
                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength
                filter(value => (value && value.length >= this.minLength) || value === ''),
                map(value => value === '' ? null : value),
            )
            .subscribe(value =>
            {
                console.log('value', value);
                this.search.emit({
                    value,
                    isOpen: this.opened,
                });

                // emit state event
                this.searchChange.emit({
                    value,
                    isOpen: this.opened,
                });
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll$.next(null);
        this.unsubscribeAll$.complete();
    }

    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef)
    {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if ( value ) value.nativeElement.focus();
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

        // emit state event
        this.searchChange.emit({
            value : this.searchControl.value,
            isOpen: this.opened,
        });
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

        // emit state event
        this.searchChange.emit({
            value : this.searchControl.value,
            isOpen: this.opened,
        });
    }
}
