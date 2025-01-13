import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
} from 'react'
import s from './SuperEditableSpan.module.css'

import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'
import editIcon from './editIcon.svg'


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText: (value: string) => void
    onEnter?: () => void
    error: string | null
    spanProps?: DefaultSpanPropsType & { defaultText?: string }// пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        value = '',
        onChangeText,
        error,
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, defaultText, ...restSpanProps} = spanProps || {}


    const onEnterCallback = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (editMode && event.key === 'Enter') {
            setEditMode(false)
            onEnter?.()
        }
    }

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        if (value === '') {
            return;
        }
        setEditMode(false);
        onBlur?.(e)
    }


    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (!editMode) {
            setEditMode(true)
        }

        onDoubleClick?.(e)
    }


    const spanClassName = s.span + (className ? '' + className : '')

    return (
        <>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={() => onEnterCallback({key: 'Enter'} as React.KeyboardEvent<HTMLInputElement>)}
                    className={s.input}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    onChange={event => onChangeText(event.currentTarget.value)}
                    value={value}
                />


            ) : (
                <div className={s.spanBlock}>
                    <img
                        src={editIcon}
                        className={s.pen}
                        alt={'edit'}
                    />
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}

                        {children || value || defaultText}
                    </span>
                </div>
            )}
            {error ? <p>{error}</p> : null}
        </>
    )
}

export default SuperEditableSpan
