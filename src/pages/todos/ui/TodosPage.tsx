import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Flex, List, Typography } from 'antd'

import 'antd/dist/reset.css'

import { FilterTodos, InputTextTodo } from '@/widgets/todos'

import {
    TodoFilterEnum,
    TodoItem,
    TODOS_LOCAL_STORAGE_KEY,
    TodoType,
} from '@/entities/todos'

export const TodosPage = () => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [filter, setFilter] = useState<TodoFilterEnum>(TodoFilterEnum.ALL)

    useEffect(() => {
        const savedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
        setTodos(savedTodos ? JSON.parse(savedTodos) : [])
    }, [])

    const leftTodos = useMemo(
        () => todos.filter((todo) => !todo.completed).length,
        [todos]
    )

    const onClearCompletedHandle = useCallback(() => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => !todo.completed)
            localStorage.setItem(
                TODOS_LOCAL_STORAGE_KEY,
                JSON.stringify(updatedTodos)
            )
            return updatedTodos
        })
    }, [])

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            switch (filter) {
                case TodoFilterEnum.ACTIVE:
                    return !todo.completed
                case TodoFilterEnum.COMPLETED:
                    return todo.completed
                default:
                    return true
            }
        })
    }, [todos, filter])

    const onAddHandle = useCallback((todo: TodoType) => {
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos, todo]
            localStorage.setItem(
                TODOS_LOCAL_STORAGE_KEY,
                JSON.stringify(updatedTodos)
            )
            return updatedTodos
        })
    }, [])

    const onChangeTodoHandle = useCallback((currentTodo: TodoType) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) =>
                todo.id === currentTodo.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
            localStorage.setItem(
                TODOS_LOCAL_STORAGE_KEY,
                JSON.stringify(updatedTodos)
            )
            return updatedTodos
        })
    }, [])

    return (
        <Flex
            vertical
            gap={10}
            style={{
                width: '30dvw',
            }}
        >
            <Typography.Title
                style={{
                    textAlign: 'center',
                }}
            >
                todos
            </Typography.Title>
            <Flex justify="space-between">
                <FilterTodos filter={filter} setFilter={setFilter} />

                <Button variant="filled" onClick={onClearCompletedHandle}>
                    Очистить выполненные
                </Button>
            </Flex>

            <InputTextTodo onAddHandle={onAddHandle} />
            <List
                style={{
                    height: 400,
                    overflow: 'auto',
                }}
                dataSource={filteredTodos}
                renderItem={(todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onChangeHandle={onChangeTodoHandle}
                    />
                )}
            />
            <Typography.Text style={{ width: '100%' }}>
                {leftTodos} невыполненных задач
            </Typography.Text>
        </Flex>
    )
}
