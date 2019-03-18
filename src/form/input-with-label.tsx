import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { IInputWithAnyValue } from '../interfaces/input-with-any-value';

interface IInputWithLabelComponentProps<T = any> extends IInputWithAnyValue<T> {
  name: string;
  value?: T;
  icon?: string;
  onChange?: (value: T) => void;
  label?: string;
}

class Component extends React.Component<
  IInputWithLabelComponentProps<any> & IWithFormsyProps
> {
  public static displayName: string = 'InputWithLabel';
  public static defaultProps: any = {
    type: 'text',
    className: 'input-field'
  } as IInputWithLabelComponentProps;

  constructor(props: any) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  public render() {
    const {
      className,
      id,
      required,
      icon,
      label,
      showRequired,
      showError,
      getErrorMessage,
      isFormSubmitted
    } = this.props;
    const otherProps = omitFormsyProps(this.props);
    let inputClass: string;
    let errorMessage: string;

    if (isFormSubmitted()) {
      inputClass = showRequired() || showError() ? 'invalid' : 'valid';
      errorMessage = getErrorMessage();
    }

    if (required && showRequired()) {
      errorMessage = 'Обязательное поле';
    }

    let iconBlock: JSX.Element;
    if (icon) {
      iconBlock = <i className="material-icons prefix">{icon}</i>;
    }

    return (
      <div className={className}>
        {iconBlock}
        <input
          {...otherProps}
          id={id}
          className={inputClass}
          value={this.props.getValue()}
          onChange={this._onChange}
          required={required}
        />
        <label htmlFor={id} className={this.props.getValue() ? 'active' : ''}>
          {label}
        </label>
        <span className="helper-text" data-error={errorMessage} />
      </div>
    );
  }

  private _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, getValue, setValue } = this.props;
    setValue(event.target.value);
    if (isFunction(onChange)) {
      setTimeout(() => {
        onChange(getValue());
      }, 0);
    }
  }
}

export const InputWithLabel = withFormsy<
  IInputWithLabelComponentProps<string | number>
>(Component);
