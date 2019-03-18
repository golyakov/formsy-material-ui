import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { IInputWithAnyValue } from '../interfaces/input-with-any-value';

interface IRadioGroupProps extends IInputWithAnyValue<number> {
  options: ISelectOption[];
  value: number;
  onChange?: (value: number) => void;
}

class Component extends React.Component<IRadioGroupProps & IWithFormsyProps> {
  public static displayName: string = 'RadioGroup';

  constructor(props: IRadioGroupProps & IWithFormsyProps) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  public render() {
    const { name, options, value, className, ...props } = this.props;
    const otherProps = omitFormsyProps(props);
    const prefixId = name.replace(/\W/gi, '_');

    return (
      <div className={className}>
        {options.map((item, i) => (
          <div key={i}>
            <label htmlFor={`${prefixId}_${item.id}`}>
              <input
                {...otherProps}
                type="radio"
                name={name}
                id={`${prefixId}_${item.id}`}
                value={item.id}
                onChange={this._onChange}
                checked={item.id === value}
              />
              <span>{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    );
  }

  private _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { options, onChange, getValue, setValue } = this.props;
    const { value } = event.target;
    const selected = options.find(item => item.id.toString() === value);

    if (!selected) {
      return;
    }

    setValue(selected.id);
    if (isFunction(onChange)) {
      setTimeout(() => {
        onChange(getValue());
      }, 0);
    }
  }
}

export const RadioGroup = withFormsy<IRadioGroupProps>(Component);
