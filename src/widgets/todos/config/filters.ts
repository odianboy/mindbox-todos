import { TodoFilterEnum } from '@/entities/todos'

export const FILTERS = [
    { type: TodoFilterEnum.ALL, label: 'Все' },
    { type: TodoFilterEnum.ACTIVE, label: 'Активные' },
    { type: TodoFilterEnum.COMPLETED, label: 'Выполненные' },
]
