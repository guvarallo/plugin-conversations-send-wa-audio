import { Actions, Manager } from '@twilio/flex-ui'

Actions.registerAction('OpenImageModal', async payload => {
  const isModalOpen =
    !!Manager.getInstance().store.getState()['flex'].view.componentViewStates
      ?.modalOpen?.isModalOpen

  await Actions.invokeAction('SetComponentState', {
    name: 'modalOpen',
    state: { isModalOpen: !isModalOpen, url: payload.url }
  })
})
