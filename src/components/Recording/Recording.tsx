// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react'
import { Actions } from '@twilio/flex-ui'
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon'

import './styles.css'
import { Recorder } from '../../types/recorder'

interface RecordingProps {
  recorderState: Recorder
  conversationSid: string
}

export const Recording = ({
  recorderState,
  conversationSid
}: RecordingProps): JSX.Element => {
  const [recording, setRecording] = useState<string | null>(null)
  const { audio, audioFile } = recorderState

  console.log('conversationSid')
  console.log(conversationSid)

  console.log('recorderState Recording')
  console.log(recorderState)

  console.log('audioFile')
  console.log(audioFile)

  useEffect(() => {
    if (audio) setRecording(audio)
  }, [audio])

  return (
    <div className='recordings-container'>
      {recording && (
        <>
          <h1>Your recordings</h1>
          <div className='recordings-list'>
            <audio controls src={recording} />
            <div className='delete-button-container'>
              <button
                className='delete-button'
                title='Delete this audio'
                onClick={() => setRecording(null)}
              >
                <DeleteIcon decorative={false} title='Delete recording' />
              </button>
            </div>
            <a href={recording} download={'audio.mp4'}>
              Click Here
            </a>
            {audioFile &&
              Actions.invokeAction('AttachFiles', {
                files: [audioFile],
                conversationSid
              })}
          </div>
        </>
      )}
    </div>
  )
}
