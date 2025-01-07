type Props = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  required?: boolean;
};

const Input = (props: Props) => {
  const {
    type,
    placeholder,
    name,    
    required = false,
  } = props;
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 placeholder-opacity-50 text-slate-700 "
      placeholder={placeholder}
      name={name}
      id={name}
    
      required={required ? true : false}
    />
  );
};

export default Input;
