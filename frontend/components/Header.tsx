export default function Header({title, text, button, description}) {
  return (
    <div className="p-4 bg-red-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="font-bold text-lg">
        {title}
      </div>
      <div className="text-left font-medium">{text}</div>
      <div className="flex justify-start md:justify-end">
        {button}
      </div>
      <div className="col-span-1 md:col-span-3 mt-2">
        {description}
      </div>
    </div>
  );
}
