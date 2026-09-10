export function ChatSkeleton() {
  return (
    <div className="bg-zinc-900/70 border border-zinc-800 backdrop-blur-sm rounded-xl lg:h-[calc(100vh-6rem)] min-h-[400px] sm:min-h-[500px] flex flex-col">
      <div className="flex items-center p-4 sm:p-6">
        <span className="w-5 h-5 mr-2 rounded-full bg-cyan-400/30" />
        <h3 className="text-lg font-medium">Portfolio AI</h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h4 className="text-sm sm:text-base lg:text-lg font-medium text-zinc-100">
          Is Talha a good fit?
        </h4>
        <p className="max-w-sm sm:max-w-md text-zinc-400 text-xs sm:text-sm lg:text-base mt-2">
          Ask about specific skills or paste job description.
        </p>
      </div>
      <div className="bg-black/30 pt-3 pb-4 px-3 sm:px-5">
        <div className="h-10 rounded-xl border border-zinc-700/50 bg-zinc-800/50 mb-3" />
        <div className="h-[4.5rem] rounded-xl border border-zinc-700 bg-zinc-800/50" />
      </div>
    </div>
  );
}
