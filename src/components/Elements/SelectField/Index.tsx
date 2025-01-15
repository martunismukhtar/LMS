import Label from "./Label";
import Select from "./Select";

type Props = {
  label: string,
  name: string,  
  placeholder?: string,
  value?: string,
  options: {id: string, text: string}[],
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  required?: boolean
}

const SelectForm = (props:Props) => {
    const {label, name, value, options, onChange, required, placeholder="-- Pilih --"} = props
  return (
    <div className="mb-6">
      <Label htmlfor={name}>{label}</Label>
      <Select name={name} 
        placeholder={placeholder}
        options={options} 
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  )
}

export default SelectForm;
