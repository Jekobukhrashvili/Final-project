export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search photos"
      className="w-90 mb-10px p-3 rounded-2xl border-2 placeholder:text-black-500 bg-cyan-100"
    />
  );
}
