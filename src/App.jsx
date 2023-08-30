import { Suspense } from "react";
import "./App.css";

import TodoBoard from "./components/TodoBoard";
import Loader from "./components/Loader";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="lightgrey" highlightColor="white">
    <div className="min-w-[100%] bg-gradient-to-tr from-blue-400 to-pink-400 p-8 min-h-[100vh]">
      <div className="mx-auto relative z-50">
        <h1 className="text-2xl md:text-4xl text-blue-300 mb-6 md:mb-16 font-bold text-center ">
          Kanban Board
        </h1>
        <div className="flex lg:justify-evenly  justify-center flex-wrap lg:flex-nowrap">
          <Suspense fallback={<Loader />}>
            <TodoBoard title="To Do" />
          </Suspense>
        </div>
      </div>
    </div>
    </SkeletonTheme>
  );
}

export default App;
