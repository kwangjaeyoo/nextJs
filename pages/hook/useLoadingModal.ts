import { create } from 'zustand'

interface LoadingModalStore {
  isOpen: number
  onOpen: () => void
  onClose: () => void
}

const useLoadingModal = create<LoadingModalStore>((set) => ({
  isOpen: 0,
  onOpen: () => set((state) => ({ isOpen: state.isOpen + 1 })),
  onClose: () =>
    set((state) => ({ isOpen: state.isOpen > 0 ? state.isOpen - 1 : 0 })),
}))

export default useLoadingModal
