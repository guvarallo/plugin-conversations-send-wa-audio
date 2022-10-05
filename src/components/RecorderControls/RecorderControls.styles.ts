import { styled } from '@twilio/flex-ui'

export const ControlsContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  margin: 0 30%;
`

export const RecorderDisplay = styled('div')`
  width: 50%;
  display: flex;
  align-items: center;
  font-size: 1rem;

  @keyframes animated-block {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const RecordingIndicator = styled('div')`
  width: 10px;
  height: 10px;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: #099fff;
  animation-name: animated-block;
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

export const RecordingStopped = styled('div')`
  width: 10px;
  height: 10px;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: #fff;
`

export const RecordingTime = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StartButtonContainer = styled('div')`
  display: flex;
  align-items: center;
  margin: 0 10px;
`

export const StartButton = styled('button')`
  border: none;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  margin-left: 5px;
  width: 30px;
  height: 30px;

  &:hover {
    color: #41295a;
    background-color: #f2ea02;
  }
`

export const CancelButtonContainer = styled('div')`
  animation-name: animated-block;
  animation-duration: 2s;
`

export const CancelButton = styled('button')`
  border: none;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 0 5px;

  &:hover {
    color: #fd1c03;
  }
`
