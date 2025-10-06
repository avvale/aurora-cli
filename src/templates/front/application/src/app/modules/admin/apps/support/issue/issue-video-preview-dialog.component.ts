import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'support-issue-video-preview-dialog',
    templateUrl: './issue-video-preview-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, NgIf],
})
export class IssueVideoPreviewDialogComponent
{
    constructor(
        private readonly dialogRef: MatDialogRef<IssueVideoPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public readonly data: { videoUrl: string | null },
    )
    { }

    close(): void
    {
        this.dialogRef.close();
    }
}
