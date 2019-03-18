import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import InputMask from 'react-input-mask';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { IInputWithAnyValue } from '../interfaces/input-with-any-value';

export interface IMaskedInputWithLabelProps extends IInputWithAnyValue<string> {
  name: string;
  label?: string;
  mask?: string;
  maskChar?: string;
  onChange?: (value: string) => void;

  // from input with label
  icon?: string;
  showIcon?: boolean;
  inputClass?: string;
}

class Component extends React.Component<
  IMaskedInputWithLabelProps & IWithFormsyProps
> {
  public static displayName: string = 'MaskedInputWithLabel';
  public static defaultProps: any = {
    type: 'text',
    className: 'input-field',
    value: '',
    mask: ''
  };

  constructor(props: IMaskedInputWithLabelProps & IWithFormsyProps) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  public render() {
    const {
      className,
      id,
      required,
      icon,
      showIcon,
      label,
      mask,
      ...props
    } = this.props;
    const otherProps = omitFormsyProps(props);
    let inputClass: string;
    let errorMessage: string;

    if (this.props.isFormSubmitted()) {
      inputClass =
        this.props.showRequired() || this.props.showError()
          ? 'invalid'
          : 'valid';
      errorMessage = this.props.getErrorMessage();
    }

    if (required && this.props.showRequired()) {
      errorMessage = 'Обязательное поле';
    }

    let iconBlock: JSX.Element;
    if (showIcon && icon) {
      iconBlock = <i className="material-icons prefix">{icon}</i>;
    }

    return (
      <div className={className}>
        {iconBlock}
        <InputMask
          {...otherProps}
          id={id}
          className={inputClass}
          required={required}
          value={this.props.getValue() as any}
          onChange={this._onChange}
          mask={mask}
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

export const MaskedInputWithLabel = withFormsy<IMaskedInputWithLabelProps>(
  Component
);
