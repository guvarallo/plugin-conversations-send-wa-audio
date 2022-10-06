import React, { useMemo } from 'react'
import { Actions } from '@twilio/flex-ui'
import { Theme } from '@twilio-paste/theme'

import { MediaLink, MediaMessageContainer } from './MediaMessage.styles'
import {
  AUDIO_MEDIA_AMR,
  AUDIO_MEDIA_MP4,
  AUDIO_MEDIA_MP3,
  AUDIO_MEDIA_MPEG,
  AUDIO_MEDIA_OGG,
  AUDIO_MEDIA_WEBM,
  FILE_MEDIA_PDF,
  IMAGE_MEDIA_GIF,
  IMAGE_MEDIA_JPEG,
  IMAGE_MEDIA_JPG,
  IMAGE_MEDIA_PNG,
  IMAGE_MEDIA_WEBP,
  MediaMap,
  MediaTypes,
  VIDEO_MEDIA_MP4,
  VIDEO_MEDIA_MPEG,
  VIDEO_MEDIA_QUICKTIME,
  VIDEO_MEDIA_WEBM
} from '../../types'
import { ImageModal } from './ImageModal'

interface MediaMessageProps {
  mediaUrl: string
  mediaType: string
}

export const MediaMessage = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => {
  const imageViewer = useMemo(
    () => (
      <div style={{ cursor: 'pointer' }}>
        <img
          src={mediaUrl}
          alt={mediaType}
          width='150px'
          onClick={() =>
            Actions.invokeAction('OpenImageModal', { url: mediaUrl })
          }
        />
      </div>
    ),
    []
  )

  const audioPlayer = useMemo(
    () => (
      <>
        <audio controls>
          <source src={mediaUrl} type={mediaType} />
        </audio>
        <MediaLink href={mediaUrl} target='_blank' rel='noopener noreferrer'>
          Full Size Player
        </MediaLink>
      </>
    ),
    []
  )

  const videoPlayer = useMemo(
    () => (
      <>
        <video width='100%' controls>
          <source src={mediaUrl} type={mediaType} />
        </video>
        <a href={mediaUrl} target='_blank' rel='noopener noreferrer'>
          Full Size Player
        </a>
      </>
    ),
    []
  )

  const pdfViewer = useMemo(
    () => (
      <>
        <iframe title='PDF Preview' src={mediaUrl} width='100%' />
        <a href={mediaUrl} target='_blank' rel='noopener noreferrer'>
          Full Size Document
        </a>
      </>
    ),
    []
  )

  const mediaMap: MediaMap = {
    [IMAGE_MEDIA_JPEG]: imageViewer,
    [IMAGE_MEDIA_JPG]: imageViewer,
    [IMAGE_MEDIA_PNG]: imageViewer,
    [IMAGE_MEDIA_GIF]: imageViewer,
    [IMAGE_MEDIA_WEBP]: imageViewer,
    [AUDIO_MEDIA_MP4]: audioPlayer,
    [AUDIO_MEDIA_MP3]: audioPlayer,
    [AUDIO_MEDIA_MPEG]: audioPlayer,
    [AUDIO_MEDIA_OGG]: audioPlayer,
    [AUDIO_MEDIA_WEBM]: audioPlayer,
    [AUDIO_MEDIA_AMR]: audioPlayer,
    [VIDEO_MEDIA_MPEG]: videoPlayer,
    [VIDEO_MEDIA_MP4]: videoPlayer,
    [VIDEO_MEDIA_QUICKTIME]: videoPlayer,
    [VIDEO_MEDIA_WEBM]: videoPlayer,
    [FILE_MEDIA_PDF]: pdfViewer
  }

  return (
    <Theme.Provider theme='default'>
      <MediaMessageContainer>
        {mediaMap[mediaType as MediaTypes]}
        <ImageModal />
      </MediaMessageContainer>
    </Theme.Provider>
  )
}
