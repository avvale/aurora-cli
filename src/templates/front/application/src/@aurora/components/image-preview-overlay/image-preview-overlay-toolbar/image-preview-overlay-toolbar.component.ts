import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ImagePreviewOverlayRef } from '../image-preview-overlay-ref';

@Component({
    selector   : 'au-image-preview-overlay-toolbar',
    templateUrl: './image-preview-overlay-toolbar.component.html',
    styleUrls  : ['./image-preview-overlay-toolbar.component.scss'],
    animations : [
        trigger('slideDown', [
            state('void', style({ transform: 'translateY(-100%)' })),
            state('enter', style({ transform: 'translateY(0)' })),
            state('leave', style({ transform: 'translateY(-100%)' })),
            transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
        ]),
    ],
    standalone: true,
})
export class ImagePreviewOverlayToolbarComponent implements OnInit
{

    // Apply animation to the host element
    @HostBinding('@slideDown') slideDown = 'enter';

    // Inject remote control
    constructor(private dialogRef: ImagePreviewOverlayRef) { }

    ngOnInit(): void
    {
        // Animate toolbar out before overlay is closed
        this.dialogRef.beforeClose().subscribe(() => this.slideDown = 'leave');
    }
}