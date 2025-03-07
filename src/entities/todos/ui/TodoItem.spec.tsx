import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from './TodoItem'

import { TodoType } from '../model/types.ts'

test('marks the task as completed', () => {
    const todo: TodoType = { id: '1', text: 'Test Todo', completed: false }
    const mockOnChange = jest.fn()

    render(<TodoItem todo={todo} onChangeHandle={mockOnChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledWith(todo)
})
