import useStore from "../utils/zustand";

export function Alert() {
  const info = useStore((state) => state.alertInfo);
  const isShow = useStore((state) => state.showAlert);
  const setShow = useStore((state) => state.setShowAlert);

  if (isShow) {
    return (
      <div
        className="flex items-center fixed mt-16 w-64 left-1/2"
        onClick={() => {
          setShow(false);
        }}
      >
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{info}</span>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
