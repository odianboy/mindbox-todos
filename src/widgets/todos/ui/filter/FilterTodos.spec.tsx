import { render, screen, fireEvent } from '@testing-library/react'

import { TodoFilterEnum } from '@/entities/todos'

import { FilterTodos } from './FilterTodos'

test('changes the filter when the buttons are pressed', () => {
    const mockSetFilter = jest.fn()
    render(
        <FilterTodos filter={TodoFilterEnum.ALL} setFilter={mockSetFilter} />
    )

    fireEvent.click(screen.getByText('Активные'))

    expect(mockSetFilter).toHaveBeenCalledWith(TodoFilterEnum.ACTIVE)
})
