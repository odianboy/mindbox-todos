import { Checkbox, List } from 'antd'

import { TodoItemType } from '../model/types.ts'

type TodoItemProps = {
    todo: TodoItemType
    onChangeHandle: (todo: TodoItemType) => void
}

export const TodoItem = (props: TodoItemProps) => {
    const { todo, onChangeHandle } = props

    const { completed, text } = todo

    const onCheckboxChangeHandle = () => {
        onChangeHandle(todo)
    }

    return (
        <List.Item>
            <Checkbox checked={completed} onChange={onCheckboxChangeHandle}>
                <span
                    style={{
                        textDecoration: completed ? 'line-through' : 'none',
                        opacity: completed ? 0.5 : 1,
                    }}
                >
                    {text}
                </span>
            </Checkbox>
        </List.Item>
    )
}
