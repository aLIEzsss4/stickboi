import {Middle} from "./Middle";

const MainPage = () => {
    return (
        <div className="flex justify-between">
            <div className="flex-grow bg-gray-200">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Gameplay</h2>
                    <p>
                        Start as one player, move forward, and face two doors with random numbers.
                        Choose a door to pass. Points are calculated based on the number on the door.
                        The game ends if the number is negative or manually by the player.
                    </p>
                </div>
            </div>

            {/* middle */}
            <Middle/>

            <div className="flex-grow bg-gray-200">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Quantity Conversion Rule</h2>
                    <p>
                        1 wojak = 5 stickboi
                        <br/>
                        1 Mefer = 25 stickboi
                        <br/>
                        1 Pepe = 50 stickboi
                        <br/>
                        1 Milady = 125 stickboi
                        <br/>
                        1 Shiba = 500 stickboi
                        <br/>
                        1 Nouns = 625 stickboi
                        <br/>
                        1 Dog = 5000 stickboi
                        <br/>
                        Number 18532 = 3 Dog + 5 Nouns + 3 Milady + 1 Mefer + 1 wojak + 2 stickboi
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
