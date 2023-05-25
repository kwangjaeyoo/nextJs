import useLoadingModal from '../hook/useLoadingModal'
import { Loader } from 'semantic-ui-react'

const LoadingModal = () => {
  const loadingModal = useLoadingModal()

  return (
    <>
      {loadingModal.isOpen > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(0px, -50%)',
          }}
        >
          <Loader active inline="centered">
            Loading
          </Loader>
        </div>
      )}
    </>
  )
}

export default LoadingModal
