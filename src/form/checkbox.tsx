import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { IInputWithAnyValue } from '../interfaces/input-with-any-value';

interface ICheckboxComponentProps extends IInputWithAnyValue<boolean> {
  onChange?: (checked: boolean) => void;
  value?: boolean;
  label?: string;
}

class Component extends React.Component<
  ICheckboxComponentProps & IWithFormsyProps
> {
  public static displayName: string = 'Checkbox';

  constructor(props: ICheckboxComponentProps & IWithFormsyProps) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  public render() {
    const { id, label, value, className, required } = this.props;
    const otherProps = omitFormsyProps(this.props);
    let inputClass: string;
    let errorMessage: string;

    if (this.props.isFormSubmitted() && required) {
      const isValid = !!value;
      inputClass = !isValid ? 'invalid' : 'valid';
      if (!isValid) {
        errorMessage = 'Обязательное поле';
      }
    }

    return (
      <div className={className}>
        <label htmlFor={id} data-error={errorMessage}>
          <input
            {...otherProps}
            id={id}
            type="checkbox"
            className={inputClass}
            onChange={this._onChange}
            checked={value}
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }

  private _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange, getValue, setValue } = this.props;
    setValue(event.target.checked);
    if (isFunction(onChange)) {
      setTimeout(() => {
        onChange(getValue());
      }, 0);
    }
  }
}

export const Checkbox = withFormsy<ICheckboxComponentProps>(Component);
