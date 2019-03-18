export interface IInputWithAnyValue<T> extends React.InputHTMLAttributes<T> {
  value?: any;
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
}
