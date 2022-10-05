import React from 'react'
import * as Flex from '@twilio/flex-ui'
import { FlexPlugin } from '@twilio/flex-plugin'

import { MessageBubbleWrapper, RecorderControls } from './components'
import './actions'

const PLUGIN_NAME = 'ConversationsSendWaAudioPlugin'

export default class ConversationsSendWaAudioPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME)
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    flex.MessageInputActions.Content.add(
      <RecorderControls key={'recorder-controls'} />
    )

    flex.MessageBubble.Content.remove('body', {
      if: props => props.message.source.media
    })

    flex.MessageBubble.Content.add(
      <MessageBubbleWrapper key={'message-bubble'} />
    )
  }
}
