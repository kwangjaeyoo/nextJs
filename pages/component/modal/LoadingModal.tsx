import useLoadingModal from '../../hook/useLoadingModal'

const LoadingModal = () => {
  const loadingModal = useLoadingModal()

  return (
    <>
      {loadingModal.isOpen > 0 && (
        <div
          className="
            absolute 
            top-1/2 
            left-1/2 
            transform 
            -translate-x-1/2 
            -translate-y-1/2
            z-50
          "
        >
          <div className="text-[#ff0000]">TODO Loading</div>
        </div>
      )}
    </>
  )
}

export default LoadingModal
