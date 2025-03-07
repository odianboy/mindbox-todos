import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TODOS_LOCAL_STORAGE_KEY } from '@/entities/todos'

import { TodosPage } from './TodosPage.tsx'

describe('Todos', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('get todos from localStorage', () => {
        localStorage.setItem(
            TODOS_LOCAL_STORAGE_KEY,
            JSON.stringify([
                { id: '1', text: 'Task 1', completed: false },
                { id: '2', text: 'Task 2', completed: true },
            ])
        )

        render(<TodosPage />)

        expect(screen.getByText('Task 1')).toBeInTheDocument()
        expect(screen.getByText('Task 2')).toBeInTheDocument()
    })

    test('switches the task between completed and active', () => {
        localStorage.setItem(
            TODOS_LOCAL_STORAGE_KEY,
            JSON.stringify([{ id: '1', text: 'Task 1', completed: false }])
        )

        render(<TodosPage />)

        const task = screen.getByText('Task 1')
        fireEvent.click(task)

        const updatedStorage = JSON.parse(
            localStorage.getItem(TODOS_LOCAL_STORAGE_KEY) ?? ''
        )
        expect(updatedStorage[0].completed).toBe(true)
    })

    test('filters issues', async () => {
        localStorage.setItem(
            TODOS_LOCAL_STORAGE_KEY,
            JSON.stringify([
                { id: '1', text: 'Task 1', completed: false },
                { id: '2', text: 'Task 2', completed: true },
            ])
        )

        render(<TodosPage />)

        const filterActive = screen.getByText('Активные')
        const filterCompleted = screen.getByText('Выполненные')

        await userEvent.click(filterActive)
        expect(screen.getByText('Task 1')).toBeInTheDocument()
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument()

        await userEvent.click(filterCompleted)
        expect(screen.getByText('Task 2')).toBeInTheDocument()
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    })

    test('clears completed tasks', async () => {
        localStorage.setItem(
            TODOS_LOCAL_STORAGE_KEY,
            JSON.stringify([
                { id: '1', text: 'Task 1', completed: true },
                { id: '2', text: 'Task 2', completed: false },
            ])
        )

        render(<TodosPage />)

        const clearButton = screen.getByText('Очистить выполненные')
        await userEvent.click(clearButton)

        expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
        expect(screen.getByText('Task 2')).toBeInTheDocument()
    })
})
