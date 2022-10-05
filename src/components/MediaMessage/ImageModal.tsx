import { useEffect, useState } from 'react'
import { Actions, Button, useFlexSelector } from '@twilio/flex-ui'
import {
  Box,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading
} from '@twilio-paste/core'

const modalHeadingID = 'modal-heading'

export const ImageModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('')
  const modalOpen = useFlexSelector(
    state => state.flex.view.componentViewStates.modalOpen
  )

  useEffect(() => {
    if (modalOpen) {
      setIsOpen(modalOpen.isModalOpen)
      setUrl(modalOpen.url)
    }
  }, [modalOpen])

  const handleClose = () => {
    setIsOpen(false)
    Actions.invokeAction('OpenImageModal', { url: url })
  }

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={isOpen}
      onDismiss={handleClose}
      size='wide'
    >
      <ModalHeader>
        <ModalHeading as='h3' id={modalHeadingID}>
          Image
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <img src={url} alt='image-modal' />
        </Box>
      </ModalBody>
    </Modal>
  )
}
