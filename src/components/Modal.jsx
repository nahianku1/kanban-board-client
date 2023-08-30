import  { memo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";



function Modal({ collection, modalinfo, setShowModal, setCards }) {
  let queryClient = useQueryClient();
  let { mutateAsync } = useMutation({
    mutationFn: (updatedtodo) => {
      return axios.put(
        `https://kanban-board-server-one.vercel.app/update-todos/${modalinfo._id}?collection=${collection}`,
        updatedtodo
      );
    },
    onSuccess: async () => {
      console.log(`Update todo`);
      if (collection === "to-do") {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        let { data  } = queryClient.getQueryData({ queryKey: ["todos"] });
        console.log(data);
        setCards(data);
      } else {
        await queryClient.invalidateQueries({ queryKey: [`${collection}`] });
        let { data } = queryClient.getQueryData({
          queryKey: [`${collection}`],
        });
        console.log(data);
        setCards(data);
      }
    },
  });

  let handeSubmit = (e) => {
    e.preventDefault();
    let text = e?.target?.title.value;
    let description = e?.target?.description.value;

    toast.promise(mutateAsync({ title: text, description }), {
      loading: <b>Updating...</b>,
      success: <b>Updated Successfully!</b>,
      error: <b>Updating failed!</b>,
    });
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0  min-w-[100%] flex justify-center items-center md:items-start min-h-screen [backdrop-filter:blur(5px)]">
      <form
        onSubmit={handeSubmit}
        className="w-[310px] md:w-[400px]  bg-gray-200 p-[20px] mt-0 md:mt-[160px] rounded-lg"
      >
        <h2 className="text-center text-blue-400 mb-4 text-1xl font-bold">
          Update Todo
        </h2>
        <div className="mb-3">
          <input
            style={{ border: "none", outline: "none" }}
            className="overflow-y-hidden block w-full 
                    resize-none py-2 px-2 text-sm rounded-sm"
            name="title"
            id="card-text"
            defaultValue={modalinfo.title}
            placeholder="Enter a title for this card..."
          />
        </div>
        <div>
          <textarea
            style={{ border: "none", outline: "none" }}
            className="overflow-y-hidden block w-full 
                     py-2 px-2 text-sm rounded-sm"
            name="description"
            id="card-text"
            defaultValue={modalinfo.description}
            placeholder="Enter a description for this card..."
          />
        </div>

        <div className="flex items-center ml-1 mt-3">
          <button
            style={{ outline: "none", border: "none" }}
            className="block text-sm mr-1 rounded-md
                        text-white bg-blue-500 hover:bg-blue-400 
                        transition-all px-3 py-2"
            type="submit"
          >
            Update
          </button>
          <button
            style={{ outline: "none", border: "none" }}
            className="block text-sm  rounded-md
                        text-white bg-red-500 hover:bg-red-400 
                        transition-all px-3 py-2"
            type="submit"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(Modal);
