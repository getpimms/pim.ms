export const InlineSnippet = ({ children }: { children: string }) => {
  return (
    <span className="inline-block rounded-md bg-[#B3E4FF] px-1 py-0.5 font-mono text-blue-900">
      {children}
    </span>
  );
};
