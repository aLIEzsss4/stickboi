const Arrow = ({ src, content, onSelect }: { src: string; content: string; onSelect: () => void }) => {
  // TODO: click to select the left door or the right door
    return (
        <div className="w-20 m-16" onClick={onSelect}>
            <img src={src} alt={content} />
            <div className="whitespace-nowrap w-20"> {content}</div>
        </div>
    );
};

export const Army = () => {
    const [characterCount, setCharacterCount] = useState(0);
    const [selectedDoor, setSelectedDoor] = useState("");

    const handleSelectDoor = (door: string) => {
        setSelectedDoor(door);
        // Handle door selection logic here
    };

    useEffect(() => {
        const fetchData = async () => {
            const numberFromChain = await fetchNumberFromChain();
            setCharacterCount(numberFromChain);
        };

        fetchData();
    }, []);

    const fetchNumberFromChain = async () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    const renderCharacters = () => {
        const characters = [];

        for (let i = 0; i < characterCount; i++) {
            characters.push(
                <img
                    key={i}
                    src="./assets/stickman.png"
                    alt="Person"
                    className="h-20 my-4"
                />
            );
        }

        return characters;
    };

    return (
        <div>
            <div className="flex items-center flex-row">
                <Arrow src={"./assets/arrow_left.png"} content="Move Left" onSelect={() => handleSelectDoor("left")} />
                {renderCharacters()}
                <Arrow src={"./assets/arrow_right.png"} content="Move Right" onSelect={() => handleSelectDoor("right")} />
            </div>
        </div>
    );
};