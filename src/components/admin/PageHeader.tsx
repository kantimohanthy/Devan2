interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
}

export default function PageHeader({
  title,
  description,
  buttonText,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>

        <p className="mt-2 text-zinc-400">
          {description}
        </p>
      </div>

      {buttonText && (
        <button className="rounded-lg bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700 transition">
          {buttonText}
        </button>
      )}
    </div>
  );
}