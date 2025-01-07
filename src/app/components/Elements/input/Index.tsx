import Label from "./Label";
import Input from "./Input";

type Props = {
  label: string,
  name: string,
  type: string,
  placeholder: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean
}

const InputForm = (props:Props) => {
    const {label, name, type, placeholder, required} = props
  return (
    <div className="mb-6">
      <Label htmlfor={name}>
          {label} 
          {required ? <span className='text-red-500 pl-2'>*</span> : ""}          
      </Label>
      <Input type={type} name={name}         
        placeholder={placeholder} 
        required={required}
        />
    </div>
  );
}

export default InputForm;
