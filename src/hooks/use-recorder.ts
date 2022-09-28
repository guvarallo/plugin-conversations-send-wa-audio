import { useEffect, Dispatch, SetStateAction } from 'react'
import { startRecording, saveRecording } from '../handlers/recorder-controls'
import {
  Recorder,
  Interval,
  AudioTrack,
  MediaRecorderEvent
} from 'types/recorder'

interface UseRecorderProps {
  recorderState: Recorder
  setRecorderState: Dispatch<SetStateAction<Recorder>>
}

export const useRecorder = ({
  recorderState,
  setRecorderState
}: UseRecorderProps) => {
  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval: Interval = null

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState: Recorder) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            typeof recordingInterval === 'number' &&
              clearInterval(recordingInterval)
            return prevState
          }

          if (
            prevState.recordingSeconds >= 0 &&
            prevState.recordingSeconds < 59
          )
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1
            }
          else if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0
            }
          else return prevState
        })
      }, 1000)
    else
      typeof recordingInterval === 'number' && clearInterval(recordingInterval)

    return () => {
      typeof recordingInterval === 'number' && clearInterval(recordingInterval)
    }
  })

  useEffect(() => {
    setRecorderState(prevState => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream)
        }
      else return prevState
    })
  }, [recorderState.mediaStream])

  useEffect(() => {
    const recorder = recorderState.mediaRecorder
    let chunks: Blob[] = []

    if (recorder && recorder.state === 'inactive') {
      recorder.start()

      recorder.ondataavailable = (e: MediaRecorderEvent) => {
        chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg' })
        const file = new File([blob], 'audio.ogg', {
          type: 'audio/ogg'
        })
        chunks = []

        setRecorderState({
          ...recorderState,
          audio: window.URL.createObjectURL(blob),
          audioFile: file
        })
      }
    }

    return () => {
      if (recorder)
        recorder.stream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop())
    }
  }, [recorderState.mediaRecorder])

  return {
    startRecording: () => startRecording(setRecorderState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder)
  }
}
