import { useReactMediaRecorder } from 'react-media-recorder';
import { Video, StopCircle, Download } from 'lucide-react';
import styles from './ScreenRecorder.module.css';

const ScreenRecorder = () => {
    // Correctly structured hook usage based on common API patterns for react-media-recorder
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });

    // We can't automatically download, but we can provide a link
    // The hook returns mediaBlobUrl when stopped.

    return (
        <div className={styles.container}>
            <div className={styles.statusIndicator}>
                <span className={`${styles.dot} ${status === 'recording' ? styles.recording : ''}`}></span>
                {status === 'recording' ? 'Recording...' : 'Recorder Idle'}
            </div>

            <div className={styles.controls}>
                {status !== 'recording' && (
                    <button className={styles.recordBtn} onClick={startRecording} title="Start Screen Recording">
                        <Video size={20} /> Start
                    </button>
                )}

                {status === 'recording' && (
                    <button className={styles.stopBtn} onClick={stopRecording} title="Stop Recording">
                        <StopCircle size={20} /> Stop
                    </button>
                )}

                {mediaBlobUrl && status !== 'recording' && (
                    <a href={mediaBlobUrl} download="math-session-recording.mp4" className={styles.downloadBtn} title="Download Recording">
                        <Download size={20} /> Save Video
                    </a>
                )}
            </div>
        </div>
    );
};

export default ScreenRecorder;
