import { Dispatch, SetStateAction } from 'react'

import { Flex } from 'antd'

import { TodoFilterEnum } from '@/entities/todos'

import { FilterButton } from './FilterButton.tsx'

import { FILTERS } from '../config/filters.ts'

type FilterTodosProps = {
    filter: TodoFilterEnum
    setFilter: Dispatch<SetStateAction<TodoFilterEnum>>
}

export const FilterTodos = (props: FilterTodosProps) => {
    const { setFilter, filter } = props

    const onClickFilter = (type: TodoFilterEnum) => setFilter(type)

    return (
        <Flex gap={10}>
            {FILTERS.map(({ type, label }) => (
                <FilterButton
                    key={type}
                    currentType={filter}
                    type={type}
                    label={label}
                    onClick={onClickFilter}
                />
            ))}
        </Flex>
    )
}
