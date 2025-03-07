import { fireEvent, render, screen } from '@testing-library/react'

import { TODOS_LOCAL_STORAGE_KEY, TodoType } from '@/entities/todos'

import { TodosPage } from './TodosPage.tsx'
import * as crypto from 'node:crypto'

describe('Todos', () => {
    test('get todos from localStorage', () => {
        const todos: TodoType[] = [
            { id: '1', text: 'Test todo', completed: false },
        ]

        localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos))

        render(<TodosPage />)

        expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    test('добавляет новую задачу', () => {
        render(<TodosPage />)

        const input = screen.getByPlaceholderText('Что планируете сделать?')
        const addButton = screen.getByText('Добавить')

        fireEvent.change(input, {
            target: {
                id: crypto.randomUUID(),
                text: 'New Todo',
                completed: false,
            },
        })
        fireEvent.click(addButton)

        expect(screen.getByText('New Todo')).toBeInTheDocument()
    })
})
