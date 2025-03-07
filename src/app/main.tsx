import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ConfigProvider } from 'antd'

import { TodosPage } from '@/pages/todos'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 16,
                    colorPrimary: '#56D67F',
                },
            }}
        >
            <TodosPage />
        </ConfigProvider>
    </StrictMode>
)
