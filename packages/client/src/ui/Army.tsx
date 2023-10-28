const Arrow = ({ src, content }: { src: string; content: string }) => {
  // TODO: click to select the left door or the right door
  return (
    <div className="w-20 m-16">
      <img src={src} />
      <div className="whitespace-nowrap w-20"> {content}</div>
    </div>
  );
};

export const Army = () => {
  return (
    <>
      <div className="flex items-center flex-row">
        <Arrow src={"./assets/arrow_left.png"} content="Move Left" />
        {/* TODO: fetch number from chain and stack multiple characters together */}
        <img src="./assets/stickman.png" alt="Person" className="h-20 my-4" />
        <Arrow src={"./assets/arrow_right.png"} content="Move Right" />
      </div>
    </>
  );
};
