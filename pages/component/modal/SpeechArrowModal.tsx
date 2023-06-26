import styles from './Speech.module.css'

interface SpeechProps {
  onClose: () => void
  marginTop?: string
  marginLeft: string
  right?: string
  arrowLeftPos?: string
  arrowRightPos?: string
  body?: React.ReactElement
}

const SpeechArrowModal: React.FC<SpeechProps> = ({
  onClose,
  marginTop = '0px',
  marginLeft,
  right,
  arrowLeftPos,
  arrowRightPos = '15px',
  body,
}) => {
  return (
    <div>
      <div
        className={styles.balloon}
        style={{ marginLeft: marginLeft, marginTop: marginTop, right: right }}
      >
        {body}
        <div
          className={styles.balloonAfter}
          style={
            arrowLeftPos ? { left: arrowLeftPos } : { right: arrowRightPos }
          }
        />
      </div>
      <div
        className="  
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-30 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          p-10"
        onClick={(event) => {
          onClose()
          event.stopPropagation()
        }}
      ></div>
    </div>
  )
}

export default SpeechArrowModal
