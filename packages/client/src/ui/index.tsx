import { Middle } from "./Middle";
import { Rank } from "./Rank";

const MainPage = () => {
  return (
    <div className="flex overflow-hidden">
      <div className="flex-grow bg-gray-200 w-1/5 overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">Stickboi</h2>
          <h2 className="text-xl font-semibold mb-2">Gameplay</h2>
          Start from a stickboi, you need to move forward, and make choice
          between two doors. The number will change according to the fomula on
          doors.
          <br />
          Every time you pass through several doors, robbers appear and you need
          to battle with them.
          <br />
          The game ends if the number is negative or player does not response on
          time.
          <br />
          <h2 className="text-xl font-semibold my-2">
            Quantity Conversion Rule
          </h2>
          As the number increase, stickbois will be merged to higher level
          memes, rules are following:
          <br />
          <p>
            1 wojak = 5 stickboi
            <br />
            1 Mefer = 25 stickboi
            <br />
            1 Pepe = 50 stickboi
            <br />
            1 Milady = 125 stickboi
            <br />
            1 Shiba = 500 stickboi
            <br />
            1 Nouns = 625 stickboi
            <br />
            1 Dog = 5000 stickboi
            <br />
            Example: Number 18532 = 3 Dog + 5 Nouns + 3 Milady + 1 Mefer + 1 wojak + 2
            stickboi
          </p>
          <h2 className="text-xl font-semibold my-2">Hotkeys</h2>
          <p>
            SPACE: Start Game
            <br />
            A/LEFT: Move left
            <br />
            D/RIGHT: Move right
            <br />
            W/UP: Battle
          </p>
          <h2 className="text-xl font-semibold my-2">Resources</h2>
          Github:{" "}
          <a
            href="https://github.com/HelheimLabs/stickboi"
            className="text-blue-500 hover:text-blue-700"
          >
            https://github.com/HelheimLabs/stickboi
          </a>
        </div>
      </div>

      {/* middle */}
      <Middle />

      <div className="flex-grow bg-gray-200 w-1/5 overflow-auto h-screen">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">Rankings</h2>
          <ul>
            <li>score = (level / 10) + (value / 5000)</li>
          </ul>
          <Rank />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
