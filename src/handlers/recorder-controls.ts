import { SetRecorder } from 'types/recorder'

export const startRecording = async (setRecorderState: SetRecorder) => {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
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

export const saveRecording = (recorder: any) => {
  if (recorder.state !== 'inactive') recorder.stop()
}
