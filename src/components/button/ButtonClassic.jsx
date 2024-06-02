import './buttonclassic.css'
export const ButtonClassic = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} className="btn-classic" disabled={disabled}>
      {children}
    </button>
  )
}
