import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '../components/TaskItem'

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
    isDragging: false
  })
}))

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => undefined
    }
  }
}))

const mockTask = {
  id: 1,
  title: 'Test task',
  completed: false
}

test('renders task with title', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('Test task')).toBeInTheDocument()
})

test('shows checked checkbox when task is completed', () => {
  const completedTask = { ...mockTask, completed: true }
  render(<TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} />)

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).toBeChecked()
})

test('calls onToggle when checkbox is clicked', () => {
  const mockToggle = vi.fn()
  render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('checkbox'))
  expect(mockToggle).toHaveBeenCalledWith(1)
})

test('calls onDelete when delete button is clicked and confirmed', () => {
  const mockDelete = vi.fn()
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={mockDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))
  expect(mockDelete).toHaveBeenCalledWith(1)
})

test('renders drag handle', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  const handle = document.querySelector('.drag-handle')
  expect(handle).toBeInTheDocument()
})

test('muestra el diálogo de confirmación al hacer clic en Eliminar', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  expect(screen.getByText('¿Eliminar la tarea "Test task"?')).toBeInTheDocument()
})

test('no llama a onDelete si se cancela la confirmación', () => {
  const mockDelete = vi.fn()
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={mockDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(mockDelete).not.toHaveBeenCalled()
})

test('cierra el diálogo al cancelar', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  expect(screen.getByText('¿Eliminar la tarea "Test task"?')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
  expect(screen.queryByText('¿Eliminar la tarea "Test task"?')).not.toBeInTheDocument()
})
