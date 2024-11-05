import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DownloadService } from '@aurora';
import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FilePreviewOverlayToolbarComponent } from './file-preview-overlay-toolbar';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';
import { FilePreviewDialog } from './file-preview-overlay.types';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

// Keycode for ESCAPE
const ESCAPE = 'Escape';
// Reusable animation timings
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector  : 'au-file-preview-overlay',
    standalone: true,
    template  : `
        <au-file-preview-overlay-toolbar>
            <div class="flex content-center">
                <mat-icon>description</mat-icon>
                {{ file.filename }}
            </div>
            <button
                mat-icon-button
                (click)="download()"
            >
                <mat-icon>file_download</mat-icon>
            </button>
        </au-file-preview-overlay-toolbar>
        <div
            class="overlay-content"
            [@slideContent]="animationState"
            (@slideContent.start)="onAnimationStart($event)"
            (@slideContent.done)="onAnimationDone($event)"
        >
            <div
                *ngIf="loading"
                class="spinner-wrapper"
            >
                <mat-spinner></mat-spinner>
            </div>
            <iframe
                class="bg-white"
                [src]="iframeSrc"
            ></iframe>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            margin: 0;
            padding: 1em;
        }

        iframe {
            width: 80vw;
            height: 80vh;
        }

        .overlay-content {
            padding: 1em;
        }
    `],
    animations: [
        trigger('fade', [
            state('fadeOut', style({ opacity: 0 })),
            state('fadeIn', style({ opacity: 1 })),
            transition('* => fadeIn', animate(ANIMATION_TIMINGS)),
        ]),
        trigger('slideContent', [
            state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
            state('enter', style({ transform: 'none', opacity: 1 })),
            state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
            transition('* => *', animate(ANIMATION_TIMINGS)),
        ]),
    ],
    imports: [
        NgIf,
        FilePreviewOverlayToolbarComponent,
        MatIconModule,
    ],
})
export class FilePreviewOverlayComponent
{
    loading: boolean = false;
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    animationStateChanged = new EventEmitter<AnimationEvent>();

    iframeSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("")

    constructor(
        private downloadService: DownloadService,
        public dialogRef: FilePreviewOverlayRef,
        @Inject(FILE_PREVIEW_DIALOG_DATA) public file: FilePreviewDialog,

        private sanitizer : DomSanitizer,
    )
    {
        switch (file.mimetype)
        {
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/vnd.ms-excel':
            case 'application/vnd.ms-powerpoint':
            case 'application/msword':
                this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${ file.url }`);
                break;

            default:
                this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${ file.url }&embedded=true`);
        }
    }

    // Listen on keydown events on a document level
    @HostListener('document:keydown', ['$event'])
    private handleKeydown(event: KeyboardEvent): void
    {
        if (event.code === ESCAPE)
        {
            this.dialogRef.close();
        }
    }

    onLoad(event: Event): void
    {
        this.loading = false;
    }

    onAnimationStart(event: AnimationEvent): void
    {
        this.animationStateChanged.emit(event);
    }

    onAnimationDone(event: AnimationEvent): void
    {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void
    {
        this.animationState = 'leave';
    }

    download(): void
    {
        this.downloadService
            .download({
                relativePathSegments: this.file.relativePathSegments,
                filename            : this.file.filename,
                originFilename      : this.file.filename,
            });
    }
}