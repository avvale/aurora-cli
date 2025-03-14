import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DownloadService } from '@aurora';
import { ImagePreviewOverlayRef } from './image-preview-overlay-ref';
import { ImagePreviewOverlayToolbarComponent } from './image-preview-overlay-toolbar';
import { IMAGE_PREVIEW_DIALOG_DATA } from './image-preview-overlay.tokens';
import { ImagePreviewDialog } from './image-preview-overlay.types';
import { NgIf } from '@angular/common';

// Keycode for ESCAPE
const ESCAPE = 'Escape';
// Reusable animation timings
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector  : 'au-file-preview-overlay',
    standalone: true,
    template  : `
        <au-image-preview-overlay-toolbar>
            <div class="flex content-center">
                <mat-icon>description</mat-icon>
                {{ image.originFilename }}
            </div>
            <button
                mat-icon-button
                (click)="download()"
            >
                <mat-icon>file_download</mat-icon>
            </button>
        </au-image-preview-overlay-toolbar>
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
            <img
                [@fade]="loading ? 'fadeOut' : 'fadeIn'"
                (load)="onLoad($event)"
                [style.opacity]="loading ? 0 : 1"
                [src]="image.url"
            >
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

        img {
            width: 100%;
            max-width: 95vw;
            max-height: 90vh;
            height: auto;
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
        ImagePreviewOverlayToolbarComponent,
        MatIconModule,
    ],
})
export class FilePreviewOverlayComponent
{
    loading: boolean = false;
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    animationStateChanged = new EventEmitter<AnimationEvent>();

    constructor(
        private downloadService: DownloadService,
        public dialogRef: ImagePreviewOverlayRef,
        @Inject(IMAGE_PREVIEW_DIALOG_DATA) public image: ImagePreviewDialog,
    )
    { }

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
                relativePathSegments: this.image.relativePathSegments,
                filename            : this.image.filename,
                originFilename      : this.image.originFilename,
            });
    }
}