import { Button } from 'antd'

import { TodoFilterEnum } from '@/entities/todos'

type FilterButtonProps = {
    type: TodoFilterEnum
    label: string
    onClick: (type: TodoFilterEnum) => void
    currentType: TodoFilterEnum
}

export const FilterButton = (props: FilterButtonProps) => {
    const { type, label, onClick, currentType } = props

    const onClickHandle = () => {
        onClick(type)
    }
    return (
        <Button
            key={type}
            type={currentType === type ? 'primary' : 'default'}
            onClick={onClickHandle}
            variant="outlined"
        >
            {label}
        </Button>
    )
}
