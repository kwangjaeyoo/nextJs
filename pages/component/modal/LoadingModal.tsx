import useLoadingModal from '../../hook/useLoadingModal'

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
          <div>Loading</div>
        </div>
      )}
    </>
  )
}

export default LoadingModal
