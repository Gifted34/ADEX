import React from 'react'
import { ButtonStrip, SplitButton } from '@dhis2/ui'
export default function HeaderComponent() {
    return (
        <div>
            <div
                style={{
                    border: '1px solid #c4c9cc',
                    backgroundColor:"lightblue",
                    padding: 8,
                    width: '100%'
                }}
            >
                <ButtonStrip>
                    <SplitButton>
                        Data Exchange Initializer
                    </SplitButton>
                </ButtonStrip>
            </div>
        </div>
    )
}
