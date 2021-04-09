interface TextProps {
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  return (
    <p className={`text-gray-600 dark:text-white ${className}`}>{children}</p>
  );
};

export default Text;
