const Door = ({ content }: { content: string }) => (
  <div className="h-32 w-48 bg-gradient-to-r from-gray-200 to-gray-400 shadow-lg mx-8 m-4">
    {content}
  </div>
);

const Doors = () => {
  // TODO: doors content and moving animation(if possible)
  return (
    <div>
      <div className="flex justify-center items-center mb-16">
        <Door content="Door 1" />
        <Door content="Door 2" />
      </div>
      <div className="flex justify-center items-center mb-16">
        <Door content="Door 3" />
        <Door content="Door 4" />
      </div>
    </div>
  );
};

export { Doors };
