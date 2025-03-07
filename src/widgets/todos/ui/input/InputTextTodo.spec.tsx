import { render, screen, fireEvent, act } from '@testing-library/react'

import { InputTextTodo } from './InputTextTodo'
import userEvent from '@testing-library/user-event'

describe('input todo', () => {
    beforeAll(() => {
        Object.defineProperty(global, 'crypto', {
            value: {
                randomUUID: jest.fn(
                    () => '123e4567-e89b-12d3-a456-426614174000'
                ),
            },
        })
    })

    test('add todo click button', () => {
        const mockOnAddHandle = jest.fn()
        render(<InputTextTodo onAddHandle={mockOnAddHandle} />)

        const input = screen.getByPlaceholderText('Что планируете сделать?')
        const button = screen.getByText('Добавить')

        act(() => {
            fireEvent.change(input, { target: { value: 'Test Todo' } })
        })

        act(() => {
            fireEvent.click(button)
        })

        expect(mockOnAddHandle).toHaveBeenCalledTimes(1)
        expect(mockOnAddHandle).toHaveBeenCalledWith({
            id: crypto.randomUUID(),
            text: 'Test Todo',
            completed: false,
        })
    })

    test('clear input after add and return focus', () => {
        render(<InputTextTodo onAddHandle={() => {}} />)

        const input = screen.getByPlaceholderText('Что планируете сделать?')
        const button = screen.getByText('Добавить')

        act(() => {
            fireEvent.change(input, { target: { value: 'Test Todo' } })
        })

        act(() => {
            fireEvent.click(button)
        })

        expect(input).toHaveValue('')
        expect(document.activeElement).toBe(input)
    })

    test('add todo press enter', async () => {
        const mockOnAddHandle = jest.fn()
        render(<InputTextTodo onAddHandle={mockOnAddHandle} />)

        const input = screen.getByPlaceholderText('Что планируете сделать?')

        await userEvent.type(input, 'Test Todo{enter}')

        expect(mockOnAddHandle).toHaveBeenCalledTimes(1)
        expect(mockOnAddHandle).toHaveBeenCalledWith({
            id: crypto.randomUUID(),
            text: 'Test Todo',
            completed: false,
        })
    })

    test('not add empty todo', () => {
        const mockOnAddHandle = jest.fn()

        render(<InputTextTodo onAddHandle={mockOnAddHandle} />)

        fireEvent.click(screen.getByText('Добавить'))

        expect(mockOnAddHandle).not.toHaveBeenCalled()
    })
})
