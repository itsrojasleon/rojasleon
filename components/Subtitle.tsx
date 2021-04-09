interface SubtitleProps {
  subtitle: string;
  icon?: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle, icon }) => (
  <h1 className="mb-8 text-4xl font-semibold font-sans">
    {subtitle} {icon}
  </h1>
);

export default Subtitle;
