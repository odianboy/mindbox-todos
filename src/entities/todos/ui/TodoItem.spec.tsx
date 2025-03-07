import { render, screen, fireEvent } from '@testing-library/react'

import { TodoItemType } from '../model/types.ts'

import { TodoItem } from './TodoItem'

test('marks the task as completed', () => {
    const todo: TodoItemType = { id: '1', text: 'Test Todo', completed: false }
    const mockOnChange = jest.fn()

    render(<TodoItem todo={todo} onChangeHandle={mockOnChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledWith(todo)
})
