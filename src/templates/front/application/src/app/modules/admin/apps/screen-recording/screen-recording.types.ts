export type ScreenRecordingRecordingState =
    | 'idle'
    | 'recording'
    | 'paused'
    | 'recorded';
export type ScreenRecordingDisplaySurface = 'tab' | 'window' | 'screen' | 'any';
export interface ScreenRecordingResponse {
    state: ScreenRecordingRecordingState;
    file?: File;
}
