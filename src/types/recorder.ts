import { Dispatch, SetStateAction } from 'react'

export type Recorder = {
  recordingMinutes: number
  recordingSeconds: number
  initRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: string | null
  audioFile: Blob | null
}

export type UseRecorder = {
  recorderState: Recorder
  startRecording: () => void
  cancelRecording: () => void
  saveRecording: () => void
}

export type RecorderControlsProps = {
  recorderState: Recorder
  handlers: {
    startRecording: () => void
    cancelRecording: () => void
    saveRecording: () => void
  }
}

export type Interval = null | number | ReturnType<typeof setInterval>
export type SetRecorder = Dispatch<SetStateAction<Recorder>>
export type AudioTrack = MediaStreamTrack
export type MediaRecorderEvent = {
  data: Blob
}
