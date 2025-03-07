import { ChangeEvent, useCallback, useRef, useState } from 'react'

import { Button, Input, InputRef, Space } from 'antd'

import { TodoItemType } from '@/entities/todos'

type InputTextTodoProps = {
    onAddHandle: (todo: TodoItemType) => void
}

export const InputTextTodo = (props: InputTextTodoProps) => {
    const { onAddHandle } = props

    const [value, setValue] = useState<string>('')

    const inputRef = useRef<InputRef | null>(null)

    const onAddTodoHandle = useCallback(() => {
        const text = value.trim()

        if (!text.length) {
            return
        }

        const newTodo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
        }

        onAddHandle(newTodo)

        setValue('')

        inputRef.current?.focus()
    }, [value, onAddHandle])

    const onChangeHandle = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        },
        []
    )

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Input
                ref={inputRef}
                placeholder="Что планируете сделать?"
                value={value}
                maxLength={100}
                onChange={onChangeHandle}
                onPressEnter={onAddTodoHandle}
            />
            <Button
                type="primary"
                onClick={onAddTodoHandle}
                disabled={!value.trim()}
            >
                Добавить
            </Button>
        </Space.Compact>
    )
}
