import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmDialog from '../components/ConfirmDialog'

test('does not render when open is false', () => {
  render(
    <ConfirmDialog
      open={false}
      message="¿Eliminar?"
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  )
  expect(screen.queryByText('¿Eliminar?')).not.toBeInTheDocument()
})

test('renders message when open is true', () => {
  render(
    <ConfirmDialog
      open={true}
      message="¿Eliminar la tarea?"
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  )
  expect(screen.getByText('¿Eliminar la tarea?')).toBeInTheDocument()
})

test('shows Cancelar and Confirmar buttons', () => {
  render(
    <ConfirmDialog
      open={true}
      message="¿Eliminar?"
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  )
  expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
})

test('calls onConfirm when Confirmar is clicked', () => {
  const mockConfirm = vi.fn()
  render(
    <ConfirmDialog
      open={true}
      message="¿Eliminar?"
      onConfirm={mockConfirm}
      onCancel={() => {}}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))
  expect(mockConfirm).toHaveBeenCalledTimes(1)
})

test('calls onCancel when Cancelar is clicked', () => {
  const mockCancel = vi.fn()
  render(
    <ConfirmDialog
      open={true}
      message="¿Eliminar?"
      onConfirm={() => {}}
      onCancel={mockCancel}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(mockCancel).toHaveBeenCalledTimes(1)
})
