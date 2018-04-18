import React from 'react';

export const isPointInRect = (point, slice) => {
  return point.x >= slice.x1 && point.x < slice.x2 && point.y > slice.y1 && point.y < slice.y2;
};

export const getInit = {
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
  method: 'GET',
  credentials: 'include',
}

export const postInit = (body) => ({
  headers: new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
  method: 'POST',
  credentials: 'include',
  body,
})

export const renderField = ({ input, label, type, id, optional, meta: { touched, error, warning } }) => (
  <div className='field__container'>
    <label className='field__label'>{label} {optional ? '' : '*'}</label>
    <input className={error ? 'field__input field__error' : 'field__input'} {...input} id={id} placeholder={label} type={type}  />
    {touched && ((error && <span className='field__error-wrap'><span className='error'>{error}</span></span>) || (warning && <span className='form__warning'>{warning}</span>))}
  </div>
)

export const renderPhoneField = ({ input, label, caption, placeholder, type, optional, meta: { touched, error, warning } }) => (
  <div className='form-row form-col-6'>
    <label>{label} {optional ? '' : '*'}</label>

    <input {...input} placeholder={placeholder} type={type} pattern='[0-9]*' inputmode='tel' />
    {touched && ((error && <span className='field__error-wrap'><span className='error'>{error}</span></span>) || (warning && <span className='form__warning'>{warning}</span>))}
    {caption ? <span className='form__caption'>{caption}</span> : null}
  </div>
)
