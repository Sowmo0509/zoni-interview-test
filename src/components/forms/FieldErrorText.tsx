const FieldErrorText = ({ children }: React.PropsWithChildren) => {
  return <span className="text-xs font-medium text-red-500">{children}</span>;
};

export default FieldErrorText;
