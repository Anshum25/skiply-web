import React from 'react';
import '../../css/Common/input-field.css';

const InputField = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-field-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className={`input-container ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        
        {type === 'textarea' ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`input-field ${icon ? 'with-icon' : ''}`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`input-field ${icon ? 'with-icon' : ''}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {props.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`input-field ${icon ? 'with-icon' : ''}`}
            {...props}
          />
        )}
      </div>
      
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default InputField;