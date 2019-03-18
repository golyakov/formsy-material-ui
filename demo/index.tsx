import Formsy from 'formsy-react';
import 'materialize-css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Checkbox } from '../src/form/checkbox';
import { Input } from '../src/form/input';
import { InputWithLabel } from '../src/form/input-with-label';
import { MaskedInputWithLabel } from '../src/form/masked-input-with-label';
import { RadioGroup } from '../src/form/radio-group';
import { Select } from '../src/form/select';
import '../src/styles/index.scss';

export class Example extends React.PureComponent<
  {},
  {
    input: string;
    inputWithLabelValue: string;
    maskedInputWithLabel: string;
    checkbox: boolean;
    radioGroup: number;
    select: number;
  }
> {
  private _options: ISelectOption[] = [
    { id: 1, label: 'red' },
    { id: 2, label: 'yellow' },
    { id: 3, label: 'green' }
  ];

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputWithLabelValue: '',
      maskedInputWithLabel: '',
      checkbox: false,
      radioGroup: 1,
      select: 1
    };
  }

  public render() {
    return (
      <div>
        <Formsy>
          <fieldset>
            <legend>Input</legend>
            <Input
              name="input"
              value={this.state.input}
              onChange={(value: string) => this.setState({ input: value })}
            />
            <div>
              Value: <span>{this.state.input}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Input with label</legend>
            <InputWithLabel
              id="inputwithlabel"
              name="inputwithlabel"
              label="InputWithLabel"
              value={this.state.inputWithLabelValue}
              onChange={(value: string) =>
                this.setState({ inputWithLabelValue: value })
              }
            />
            <div>
              Value: <span>{this.state.inputWithLabelValue}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Masked input with label</legend>
            <MaskedInputWithLabel
              id="maskedInputWithLabel"
              name="maskedInputWithLabel"
              label="MaskedInputWithLabel"
              type="tel"
              icon="phone"
              mask="+7 (999) 999-9999"
              value={this.state.maskedInputWithLabel}
              onChange={(value: string) =>
                this.setState({ maskedInputWithLabel: value })
              }
            />
            <div>
              Value: <span>{this.state.maskedInputWithLabel}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Checkbox</legend>
            <Checkbox
              id="checkbox"
              name="checkbox"
              label="Checkbox"
              value={this.state.checkbox}
              onChange={value => this.setState({ checkbox: value })}
            />
            <div>
              Value: <span>{JSON.stringify(this.state.checkbox)}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>RadioGroup</legend>
            <RadioGroup
              id="radioGroup"
              name="radioGroup"
              value={this.state.radioGroup}
              options={this._options}
              onChange={value => this.setState({ radioGroup: value })}
            />
            <div>
              Value: <span>{this.state.radioGroup}</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>Select</legend>
            <Select
              id="select"
              name="select"
              label="Select"
              options={this._options}
              value={this.state.select}
              onChange={value => this.setState({ select: value })}
            />
            <div>
              Value: <span>{this.state.select}</span>
            </div>
          </fieldset>
        </Formsy>
      </div>
    );
  }
}

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('example')
  );

render(Example);

if ((module as any).hot) {
  (module as any).hot.accept('./main.js', () => render(Example));
}
