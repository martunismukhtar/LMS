type Props = {
  htmlfor: string;
  children: React.ReactNode;
}

const Label = (props: Props) => {
  const { htmlfor, children } = props;
  return (
    <label
      htmlFor={htmlfor}
      className="block text-slate-800 text-sm mb-2"
    >
      {children}
    </label>
  );
};

export default Label;
