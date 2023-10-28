import { Doors } from "./Doors";
import { Army } from "./army";

const MainPage = () => {
  return (
    <div className="flex justify-between">
      {/* left TODO: more game guidance here */}
      <div className="flex-grow bg-gray-200"></div>

      {/* middle */}
      <div className="w-112 bg-white-300">
        <div className="flex flex-col justify-center items-center h-screen">
          <Doors />
          <Army />
        </div>
      </div>

      {/* right TODO: more game guidance here */}
      <div className="flex-grow bg-gray-200"></div>
    </div>
  );
};

export default MainPage;
