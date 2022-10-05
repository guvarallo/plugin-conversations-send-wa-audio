export const IMAGE_MEDIA_JPEG = 'image/jpeg'
export const IMAGE_MEDIA_JPG = 'image/jpg'
export const IMAGE_MEDIA_PNG = 'image/png'
export const IMAGE_MEDIA_GIF = 'image/gif'
export const IMAGE_MEDIA_WEBP = 'image/webp'

export const AUDIO_MEDIA_MP4 = 'audio/mp4'
export const AUDIO_MEDIA_MP3 = 'audio/mp3'
export const AUDIO_MEDIA_MPEG = 'audio/mpeg'
export const AUDIO_MEDIA_OGG = 'audio/ogg'
export const AUDIO_MEDIA_WEBM = 'audio/webm'
export const AUDIO_MEDIA_AMR = 'audio/amr'

export const VIDEO_MEDIA_MPEG = 'video/mpeg'
export const VIDEO_MEDIA_MP4 = 'video/mp4'
export const VIDEO_MEDIA_QUICKTIME = 'video/quicktime'
export const VIDEO_MEDIA_WEBM = 'video/webm'

export const FILE_MEDIA_PDF = 'application/pdf'

type ImageTypes =
  | typeof IMAGE_MEDIA_JPEG
  | typeof IMAGE_MEDIA_JPG
  | typeof IMAGE_MEDIA_PNG
  | typeof IMAGE_MEDIA_GIF
  | typeof IMAGE_MEDIA_WEBP

type AudioTypes =
  | typeof AUDIO_MEDIA_MP4
  | typeof AUDIO_MEDIA_MP3
  | typeof AUDIO_MEDIA_MPEG
  | typeof AUDIO_MEDIA_OGG
  | typeof AUDIO_MEDIA_WEBM
  | typeof AUDIO_MEDIA_AMR

type VideoTypes =
  | typeof VIDEO_MEDIA_MPEG
  | typeof VIDEO_MEDIA_MP4
  | typeof VIDEO_MEDIA_QUICKTIME
  | typeof VIDEO_MEDIA_WEBM

export type MediaTypes =
  | ImageTypes
  | AudioTypes
  | VideoTypes
  | typeof FILE_MEDIA_PDF

export type MediaMap = {
  [media in MediaTypes]: JSX.Element
}
