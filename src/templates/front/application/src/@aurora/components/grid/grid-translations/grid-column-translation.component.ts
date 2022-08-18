// angular
import { ContentObserver } from '@angular/cdk/observers';
import { ChangeDetectionStrategy, Component, ElementRef, Host, Input, OnInit, Optional } from '@angular/core';
import { GridTranslationsService } from './grid-translations.service';
import { GridTranslationsComponent } from './grid-translations.component';

@Component({
    selector: 'au-grid-column-translation',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridColumnTranslationComponent implements OnInit
{
    // set field/column translation
    @Input() field: string;
    @Input() gridId: string = 'grid';

    constructor(
        @Optional() @Host() private parent: GridTranslationsComponent,
        private content: ElementRef,
        private gridTranslationsService: GridTranslationsService,
        private contentObserver: ContentObserver,
    ) { }

    ngOnInit(): void
    {
        if (this.parent === null)
        {
            throw new Error(`
                <au-grid-column-translation></au-grid-column-translation>
                Has to be declared inside an <au-grid-translations></au-grid-translations>

                Please create this hierarchical structure

                <au-grid-translations>
                    <au-grid-column-translation></au-grid-column-translation>
                    <au-grid-column-translation></au-grid-column-translation>
                    ...
                </au-grid-translations>
            `);
        }

        // observer changes on ng-content
        this.contentObserver
            .observe(this.content.nativeElement)
            .subscribe(res =>
                res.forEach(change =>
                    this.gridTranslationsService
                        .setColumnMessage(this.gridId, this.field, change.target.nodeValue.trim()),
                ),
            );
    }
}
