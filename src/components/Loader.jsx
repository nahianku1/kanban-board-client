import Tile from "./Tile";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Loader() {
  return (
    <>
      <div
        className="bg-gray-200 w-11/12 sm:w-10/12 
            md:w-80 h-full pb-3 rounded-[13px] md:mr-6 mb-6"
      >
        <h2
          className="px-4 py-2 text-center 
            text-black text-lg font-bold"
        >
          <Skeleton />
        </h2>
        <article id="list" className="mx-2">
          {[...Array(1).keys()].map(() => (
            <Tile key={crypto.randomUUID()} card={{}}>
              <h3>
                <Skeleton />
              </h3>
              <p>
                <Skeleton />
              </p>
            </Tile>
          ))}
        </article>
        <button
          style={{ outline: "none", border: "none" }}
          className="text-sm ml-2 mt-1 
        text-blue-500 hover:bg-blue-200 transition-all px-3 py-1"
          type="button"
        >
          <span className="text-2xl">+</span> Add a card
        </button>
      </div>
      <div
        className="bg-gray-200 w-11/12 sm:w-10/12 
            md:w-80 h-full pb-3 rounded-[13px] md:mr-6 mb-6"
      >
        <h2
          className="px-4 py-2 text-center 
            text-black text-lg font-bold"
        >
          <Skeleton />
        </h2>
        <article id="list" className="mx-2">
          {[...Array(1).keys()].map(() => (
            <Tile key={crypto.randomUUID()} card={{}}>
              <h3>
                <Skeleton />
              </h3>
              <p>
                <Skeleton />
              </p>
            </Tile>
          ))}
        </article>
        <button
          style={{ outline: "none", border: "none" }}
          className="text-sm ml-2 mt-1 
        text-blue-500 hover:bg-blue-200 transition-all px-3 py-1"
          type="button"
        >
          + Add a card
        </button>
      </div>
      <div
        className="bg-gray-200 w-11/12 sm:w-10/12 
            md:w-80 h-full pb-3 rounded-[13px] md:mr-6 mb-6"
      >
        <h2
          className="px-4 py-2 text-center 
            text-black text-lg font-bold"
        >
          <Skeleton />
        </h2>
        <article id="list" className="mx-2">
          {[...Array(1).keys()].map((card) => (
            <Tile key={crypto.randomUUID()} card={{}}>
              <h3>
                <Skeleton />
              </h3>
              <p>
                <Skeleton />
              </p>
            </Tile>
          ))}
        </article>
        <button
          style={{ outline: "none", border: "none" }}
          className="text-sm ml-2 mt-1 
        text-blue-500 hover:bg-blue-200 transition-all px-3 py-1"
          type="button"
        >
          + Add a card
        </button>
      </div>
    </>
  );
}

export default Loader;
