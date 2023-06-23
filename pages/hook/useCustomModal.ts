import { t } from 'i18next'
import { create } from 'zustand'

interface CustomModalStore {
  obj: {
    msg: string
    btnText: string
    open: boolean
  }
  onOpen: (msg: string, btnText?: string) => void
  onClose: () => void
}

const useCustomModal = create<CustomModalStore>((set) => ({
  obj: {
    msg: '',
    btnText: t('ok'),
    open: false,
  },
  onOpen: (msg, btnText) =>
    set((state) => ({
      ...state,
      obj: { open: true, btnText: btnText ? btnText : t('ok'), msg: msg },
    })),
  onClose: () =>
    set(() => ({ obj: { open: false, btnText: t('ok'), msg: '' } })),
}))

export default useCustomModal
