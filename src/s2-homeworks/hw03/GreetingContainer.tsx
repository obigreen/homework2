import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

export const pureAddUser = (name: string, setError: React.Dispatch<React.SetStateAction<string | null>>, setName: React.Dispatch<React.SetStateAction<string>>, addUserCallback: () => void) => {
    if (!name.trim()) {
        setError("Ошибка! Введите имя!")
    } else {
        addUserCallback()
        setName("")
    }
}


export const pureOnBlur = (name: string, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (!name.trim()) {
        setError("Ошибка! Введите имя!")
    }
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: any) => {
    if(e.key === 'Enter') {
        addUser()
    }
}


const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => {


    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value
        setName(name)

        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, () => addUserCallback(name))
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users.length > 0 ? users[users.length - 1].name : "";

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
