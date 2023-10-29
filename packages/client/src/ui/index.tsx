import {Middle} from "./Middle";

const MainPage = () => {
  return (
    <div className="flex justify-between">
      {/* left TODO: more game guidance here */}
      <div className="flex-grow bg-gray-200">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Game Instructions</h2>
          <p>Welcome to the game! Choose the right door and get your memes!</p>
        </div>
      </div>

      {/* middle */}
      <Middle />

      {/* right TODO: more game guidance here */}
      <div className="flex-grow bg-gray-200">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Rankings/Points</h2>
          <ul>
            <li>The highest number the player reach.</li>
            <li>How many doors player pass.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
