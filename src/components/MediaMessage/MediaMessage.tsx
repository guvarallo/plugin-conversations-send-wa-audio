import React from 'react'
import { Actions, useFlexSelector } from '@twilio/flex-ui'
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

const imageViewer = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => (
  <div style={{ cursor: 'pointer' }}>
    <img
      src={mediaUrl}
      alt={mediaType}
      width='150px'
      onClick={() => Actions.invokeAction('OpenImageModal', { url: mediaUrl })}
    />
  </div>
)

const audioPlayer = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => (
  <>
    <audio controls>
      <source src={mediaUrl} type={mediaType} />
    </audio>
    <MediaLink href={mediaUrl} target='_blank' rel='noopener noreferrer'>
      Full Size Player
    </MediaLink>
  </>
)

const pdfViewer = (mediaUrl: string): JSX.Element => (
  <>
    <iframe title='PDF Preview' src={mediaUrl} width='100%' />
    <a href={mediaUrl} target='_blank' rel='noopener noreferrer'>
      Full Size Document
    </a>
  </>
)

const videoPlayer = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => (
  <>
    <video width='100%' controls>
      <source src={mediaUrl} type={mediaType} />
    </video>
    <a href={mediaUrl} target='_blank' rel='noopener noreferrer'>
      Full Size Player
    </a>
  </>
)

export const MediaMessage = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => {
  const isModalOpen = useFlexSelector(
    state => state.flex.view.componentViewStates.modalOpen?.isModalOpen
  )

  const mediaMap: MediaMap = {
    [IMAGE_MEDIA_JPEG]: imageViewer({ mediaUrl, mediaType }),
    [IMAGE_MEDIA_JPG]: imageViewer({ mediaUrl, mediaType }),
    [IMAGE_MEDIA_PNG]: imageViewer({ mediaUrl, mediaType }),
    [IMAGE_MEDIA_GIF]: imageViewer({ mediaUrl, mediaType }),
    [IMAGE_MEDIA_WEBP]: imageViewer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_MP4]: audioPlayer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_MP3]: audioPlayer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_MPEG]: audioPlayer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_OGG]: audioPlayer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_WEBM]: audioPlayer({ mediaUrl, mediaType }),
    [AUDIO_MEDIA_AMR]: audioPlayer({ mediaUrl, mediaType }),
    [VIDEO_MEDIA_MPEG]: videoPlayer({ mediaUrl, mediaType }),
    [VIDEO_MEDIA_MP4]: videoPlayer({ mediaUrl, mediaType }),
    [VIDEO_MEDIA_QUICKTIME]: videoPlayer({ mediaUrl, mediaType }),
    [VIDEO_MEDIA_WEBM]: videoPlayer({ mediaUrl, mediaType }),
    [FILE_MEDIA_PDF]: pdfViewer(mediaUrl)
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
