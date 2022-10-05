import { SetRecorder } from '../types/recorder'

export const startRecording = async (setRecorderState: SetRecorder) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })

    setRecorderState(prevState => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream
      }
    })
  } catch (err) {
    console.log(err)
  }
}

interface SaveRecording {
  recorder: MediaRecorder | null
}

export const saveRecording = ({ recorder }: SaveRecording) => {
  if (recorder && recorder.state !== 'inactive') {
    recorder.stop()
  }
}
