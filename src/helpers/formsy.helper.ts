import { IWithFormsyProps } from 'formsy-react';
import omit = require('lodash.omit');

export function omitFormsyProps(props: IWithFormsyProps) {
  return omit(props, [
    'getErrorMessage',
    'getErrorMessages',
    'getValue',
    'hasValue',
    'isFormDisabled',
    'isValid',
    'isPristine',
    'isFormSubmitted',
    'isRequired',
    'isValidValue',
    'resetValue',
    'setValidations',
    'setValue',
    'showRequired',
    'showError',
    'innerRef',
    'validationError',
    'validationErrors'
  ]);
}
