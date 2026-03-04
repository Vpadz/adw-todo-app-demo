function ConfirmDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-actions">
          <button onClick={onCancel} className="btn btn-cancel">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
