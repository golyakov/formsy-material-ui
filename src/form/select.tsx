import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { ISelectWithAnyValue } from '../interfaces/select-with-any-value';

interface ISelectProps<T = any> extends ISelectWithAnyValue<T> {
  value: T;
  onChangeValue?: (value: T) => void;
  options: ISelectOption[];
  label?: string;
}

class Component extends React.Component<ISelectProps & IWithFormsyProps> {
  private _numberRegExp: RegExp = new RegExp('^\\d+$');

  constructor(props: any) {
    super(props);

    this._changeValue = this._changeValue.bind(this);
  }

  public render() {
    const { className, id, options, required, label, ...props } = this.props;
    const otherProps = omitFormsyProps(props);
    let selectClass: string = 'browser-default';
    let errorMessage: string;

    if (this.props.isFormSubmitted()) {
      selectClass += ` ${
        this.props.showRequired() || this.props.showError()
          ? 'invalid'
          : 'valid'
      }`;
      errorMessage = this.props.getErrorMessage();
    }

    if (required && this.props.showRequired()) {
      errorMessage = 'Обязательное поле';
    }

    return (
      <div className={className}>
        <label htmlFor={id} data-error={errorMessage}>
          {label}
        </label>
        <select
          {...otherProps}
          id={id}
          className={selectClass}
          onChange={this._changeValue}
          value={this.props.getValue()}
          required={required}
        >
          {options.map((option, i) => (
            <option key={i} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  private _changeValue(event: React.ChangeEvent<HTMLSelectElement>) {
    const { onChange, getValue, setValue } = this.props;
    setValue(this._convertValue(event.target.value));
    if (isFunction(onChange)) {
      setTimeout(() => {
        onChange(getValue());
      }, 0);
    }
  }

  private _convertValue(value: string): string | number {
    return this._numberRegExp.test(value) ? parseInt(value, 10) : value;
  }
}

export const Select = withFormsy<ISelectProps>(Component);
