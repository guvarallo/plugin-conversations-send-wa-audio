import { useEffect, useState } from 'react'
import { Actions } from '@twilio/flex-ui'
import { MicrophoneOnIcon } from '@twilio-paste/icons/esm/MicrophoneOnIcon'
import { ClearIcon } from '@twilio-paste/icons/esm/ClearIcon'
import { SendIcon } from '@twilio-paste/icons/esm/SendIcon'

import { formatMinutes, formatSeconds } from '../../utils/format-time'
import { useRecorder } from '../../hooks/UseRecorder'
import {
  CancelButton,
  CancelButtonContainer,
  ControlsContainer,
  RecorderDisplay,
  RecordingIndicator,
  RecordingStopped,
  RecordingTime,
  StartButton,
  StartButtonContainer
} from './RecorderControls.styles'

export const RecorderControls = (props: any): JSX.Element => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const { recorderState, startRecording, saveRecording, cancelRecording } =
    useRecorder()

  useEffect(() => {
    setIsRecording(recorderState.initRecording)
  }, [recorderState.initRecording])

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
    <ControlsContainer>
      <RecorderDisplay>
        <RecordingTime>
          {isRecording ? <RecordingIndicator /> : <RecordingStopped />}
          <span>{formatMinutes(recorderState.recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recorderState.recordingSeconds)}</span>
        </RecordingTime>
      </RecorderDisplay>
      <StartButtonContainer>
        {isRecording ? (
          <>
            <CancelButtonContainer>
              <CancelButton title='Cancel recording' onClick={cancelRecording}>
                <ClearIcon decorative={false} title='Clear icon' />
              </CancelButton>
            </CancelButtonContainer>
            <StartButton
              title='Save recording'
              disabled={recorderState.recordingSeconds === 0}
              onClick={saveRecording}
            >
              <SendIcon decorative={false} title='Send icon' />
            </StartButton>
          </>
        ) : (
          <StartButton title='Start recording' onClick={startRecording}>
            <MicrophoneOnIcon decorative={false} title='Record microphone' />
          </StartButton>
        )}
      </StartButtonContainer>
    </ControlsContainer>
  )
}
