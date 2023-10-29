import { Doors } from "./Doors";
import { MockButtons } from "./MockButtons";
import { Army } from "./Army";

const MainPage = () => {
    return (
        <div className="flex justify-between">
            {/* left TODO: more game guidance here */}
            <div className="flex-grow bg-gray-200">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Game Instructions</h2>
                    <p>
                        Welcome to the game! Choose the right door and get your memes!
                    </p>
                </div>
            </div>

            {/* middle */}
            <div className="w-112 bg-white-300">
                <div className="flex flex-col justify-center items-center h-screen">
                    <Doors />
                    <Army />
                    <MockButtons />
                </div>
            </div>

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
