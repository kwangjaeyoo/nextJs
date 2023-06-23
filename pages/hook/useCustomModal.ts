import { t } from 'i18next'
import { create } from 'zustand'

export interface btnProp {
  btnClick?: () => void
  btnText?: string
  btnBgColor?: string
}

// 모달안에서만 사용하도록 /////
interface btnPropInModal {
  btnClick?: () => void
  btnText: string
  btnBgColor: string
}

interface CustomModalStore {
  obj: {
    msg: string
    btnObject: btnPropInModal
    open: boolean
  }
  onOpen: (objmsg: string, btnObject?: btnProp) => void
  onClose: () => void
}

const useCustomModal = create<CustomModalStore>((set) => ({
  obj: {
    msg: '',
    btnObject: {
      btnClick: () => {},
      btnText: t('ok'),
      btnBgColor: 'bg-[#7340BF]',
    },
    open: false,
  },
  onOpen: (msg, btnObject) =>
    set((state) => ({
      ...state,
      obj: {
        msg: msg,
        btnObject: btnObject
          ? {
              btnClick: btnObject.btnClick || (() => {}),
              btnText: btnObject.btnText || t('ok'),
              btnBgColor: btnObject.btnBgColor || 'bg-[#7340BF]',
            }
          : {
              btnClick: () => {},
              btnText: t('ok'),
              btnBgColor: 'bg-[#7340BF]',
            },
        open: true,
      },
    })),
  onClose: () =>
    set(() => ({
      obj: {
        msg: '',
        btnObject: {
          btnClick: () => {},
          btnText: '',
          btnBgColor: '',
        },
        open: false,
      },
    })),
}))

export default useCustomModal
