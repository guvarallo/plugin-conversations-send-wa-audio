import React from 'react'

import { MediaLink, MediaMessageContainer } from './MediaMessage.styles'

interface MediaMessageProps {
  mediaUrl: string
  mediaType: string
}

export const MediaMessage = ({
  mediaUrl,
  mediaType
}: MediaMessageProps): JSX.Element => (
  <MediaMessageContainer>
    <audio controls>
      <source src={mediaUrl} type={mediaType} />
    </audio>
    <MediaLink href={mediaUrl} target='_blank' rel='noopener noreferrer'>
      Full Size Player
    </MediaLink>
  </MediaMessageContainer>
)
