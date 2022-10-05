import { useEffect } from 'react'
import { Actions } from '@twilio/flex-ui'
import { MicrophoneOnIcon } from '@twilio-paste/icons/esm/MicrophoneOnIcon'
import { ClearIcon } from '@twilio-paste/icons/esm/ClearIcon'
import { SendIcon } from '@twilio-paste/icons/esm/SendIcon'

import './styles.css'
import { formatMinutes, formatSeconds } from '../../utils/format-time'
import { useRecorder } from '../../hooks/UseRecorder'

export const RecorderControls = (props: any): JSX.Element => {
  const { recorderState, startRecording, saveRecording, cancelRecording } =
    useRecorder()

  useEffect(() => {
    const { audioFile } = recorderState
    if (audioFile) {
      Actions.invokeAction('AttachFiles', {
        files: [audioFile],
        conversationSid: props.conversationSid
      })
    }
  }, [recorderState.audioFile])

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
                onClick={cancelRecording}
              >
                <ClearIcon decorative={false} title='Clear icon' />
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
              <SendIcon decorative={false} title='Send icon' />
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
    </>
  )
}
