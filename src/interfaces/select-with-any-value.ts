export interface ISelectWithAnyValue<T> extends React.SelectHTMLAttributes<T> {
  value?: any;
  onChange?: (value: any) => void;
  onSubmit?: (value: any) => void;
}
