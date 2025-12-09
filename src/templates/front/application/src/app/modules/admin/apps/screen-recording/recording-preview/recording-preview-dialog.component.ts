import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from '@aurora';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'screen-recording-recording-preview',
    templateUrl: './recording-preview-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        TitleComponent,
        TranslocoModule,
    ],
    providers: [
        {
            provide: TRANSLOCO_SCOPE,
            useValue: 'screen-recording',
            multi: true,
        },
    ],
})
export class RecordingPreviewDialogComponent {
    constructor(
        private readonly dialogRef: MatDialogRef<RecordingPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public readonly data: { videoUrl: string | null },
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}
