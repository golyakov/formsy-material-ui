import { IWithFormsyProps, withFormsy } from 'formsy-react';
import isFunction = require('lodash.isfunction');
import React from 'react';
import { omitFormsyProps } from '../helpers/formsy.helper';
import { IInputWithAnyValue } from '../interfaces/input-with-any-value';

interface IInputProps<T = any> extends IInputWithAnyValue<T> {
  value: T;
  onChange?: (value: T) => void;
  name: string;
}

class Component extends React.PureComponent<IInputProps & IWithFormsyProps> {
  public static displayName: string = 'Input';
  public static defaultProps: any = {
    type: 'text'
  } as IInputProps;

  constructor(props: any) {
    super(props);

    this._onChange = this._onChange.bind(this);
  }

  public render() {
    const { className, id, required, ...props } = this.props;
    const otherProps = omitFormsyProps(props);

    return (
      <input
        {...otherProps}
        id={id}
        onChange={this._onChange}
        value={this.props.value}
        required={required}
        className={className}
      />
    );
  }

  private _onChange(event: React.FormEvent<HTMLInputElement>) {
    const { type, onChange } = this.props;
    this.props.setValue(
      event.target[type === 'checkbox' ? 'checked' : 'value']
    );
    if (isFunction(onChange)) {
      setTimeout(() => {
        onChange(this.props.getValue());
      }, 0);
    }
  }
}

export const Input = withFormsy<IInputProps>(Component);
