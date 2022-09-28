// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faMicrophone,
//   faTimes,
//   faSave
// } from '@fortawesome/free-solid-svg-icons'
import { MicrophoneOnIcon } from '@twilio-paste/icons/esm/MicrophoneOnIcon'
import { ClearIcon } from '@twilio-paste/icons/esm/ClearIcon'
import { SendIcon } from '@twilio-paste/icons/esm/SendIcon'

import { formatMinutes, formatSeconds } from '../../utils/format-time'
// import { RecorderControlsProps } from 'types/recorder'
import './styles.css'
import { useRecorder } from '../../hooks/use-recorder'
import { Recording } from '../Recording'
import { Recorder } from '../../types/recorder'
import { useState } from 'react'

const initialState: Recorder = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
  audioFile: null
}

export const RecorderControls = (props: any): JSX.Element => {
  const [recorderState, setRecorderState] = useState<Recorder>(initialState)
  const { startRecording, saveRecording } = useRecorder({
    recorderState,
    setRecorderState
  })

  console.log('recorderState Controls')
  console.log(recorderState)

  return (
    <>
      <div className='controls-container'>
        <div className='recorder-display'>
          <div className='recording-time'>
            {recorderState.initRecording && (
              <div className='recording-indicator'></div>
            )}
            <span>{formatMinutes(recorderState.recordingMinutes)}</span>
            <span>:</span>
            <span>{formatSeconds(recorderState.recordingSeconds)}</span>
          </div>
          {recorderState.initRecording && (
            <div className='cancel-button-container'>
              <button
                className='cancel-button'
                title='Cancel recording'
                onClick={() => setRecorderState(initialState)}
              >
                <ClearIcon decorative={false} title='Description of icon' />
              </button>
            </div>
          )}
        </div>
        <div className='start-button-container'>
          {recorderState.initRecording ? (
            <button
              className='start-button'
              title='Save recording'
              disabled={recorderState.recordingSeconds === 0}
              onClick={saveRecording}
            >
              <SendIcon decorative={false} title='Description of icon' />
            </button>
          ) : (
            <button
              className='start-button'
              title='Start recording'
              onClick={startRecording}
            >
              <MicrophoneOnIcon decorative={false} title='Record microphone' />
            </button>
          )}
        </div>
      </div>
      <Recording
        recorderState={recorderState}
        conversationSid={props.conversationSid}
      />
    </>
  )
}
