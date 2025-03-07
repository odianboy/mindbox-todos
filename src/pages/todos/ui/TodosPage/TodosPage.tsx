import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Flex, List, Typography } from 'antd'

import 'antd/dist/reset.css'

import {
    TodoFilterEnum,
    TodoItem,
    TODOS_LOCAL_STORAGE_KEY,
    TodoItemType,
} from '@/entities/todos'

import { FilterTodos } from '../FilterTodos'
import { InputTextTodo } from '../InputTextTodo'

export const TodosPage = () => {
    const [todos, setTodos] = useState<TodoItemType[]>([])
    const [filter, setFilter] = useState<TodoFilterEnum>(TodoFilterEnum.ALL)

    useEffect(() => {
        const savedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY)
        setTodos(savedTodos ? JSON.parse(savedTodos) : [])
    }, [])

    const { leftTodos, completeTodos } = useMemo(() => {
        return todos.reduce(
            (acc, todo) => ({
                ...acc,
                leftTodos: acc.leftTodos + (!todo.completed ? 1 : 0),
                completeTodos: acc.completeTodos + (todo.completed ? 1 : 0),
            }),
            { leftTodos: 0, completeTodos: 0 }
        )
    }, [todos])
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

    const onAddHandle = useCallback((todo: TodoItemType) => {
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos, todo]
            localStorage.setItem(
                TODOS_LOCAL_STORAGE_KEY,
                JSON.stringify(updatedTodos)
            )
            return updatedTodos
        })
    }, [])

    const onChangeTodoHandle = useCallback((currentTodo: TodoItemType) => {
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
                maxWidth: 500,
                margin: '0 auto',
                padding: '10px',
            }}
        >
            <Typography.Title
                style={{
                    textAlign: 'center',
                    fontFamily: '"Press Start 2P", system-ui',
                    fontSize: '1.7rem',
                }}
            >
                Mindbox-todos
            </Typography.Title>
            <FilterTodos filter={filter} setFilter={setFilter} />
            <InputTextTodo onAddHandle={onAddHandle} />
            <List
                style={{
                    height: '30vh',
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

            <div style={{ textAlign: 'center', height: 30 }}>
                {leftTodos > 0 && (
                    <Typography.Text strong>
                        Невыполненных задач: {leftTodos}
                    </Typography.Text>
                )}
            </div>

            <Button
                type="primary"
                onClick={onClearCompletedHandle}
                disabled={!completeTodos}
            >
                Очистить выполненные
            </Button>
        </Flex>
    )
}
