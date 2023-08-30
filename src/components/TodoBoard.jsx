import { memo, useContext, useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import { ReactSortable } from "react-sortablejs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DoingBoard from "./DoingBoard";
import { FaTrash, FaPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import Modal from "./Modal";
import { list } from "postcss";

function TodoBoard({ title }) {
  console.log(`TODO Rendered`);

  let { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return axios.get("https://kanban-board-server-one.vercel.app/get-todos?collection=to-do");
    },
  });

  let queryClient = useQueryClient();

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [modalinfo, setModalinfo] = useState();
  const [cards, setCards] = useState(data?.data ?? []);

  let { mutateAsync } = useMutation({
    mutationFn: (newtodo) => {
      return axios.post(
        `https://kanban-board-server-one.vercel.app/create-todos?collection=to-do`,
        newtodo
      );
    },
    onSuccess: async () => {
      console.log(`Created todo`);
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      let { data } = queryClient.getQueryData({ queryKey: ["todos"] });
      console.log(data);
      setCards(data);
    },
  });

  let { mutateAsync: deleteMutateAsync } = useMutation({
    mutationFn: (id) => {
      return axios.delete(
        `https://kanban-board-server-one.vercel.app/delete-todos/${id}?collection=to-do`
      );
    },
    onSuccess: async () => {
      console.log(`delete todo`);
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      let { data } = queryClient.getQueryData({ queryKey: ["todos"] });
      console.log(data);
      setCards(data);
    },
  });

  let handleEdit = (card) => {
    setModalinfo(card);
    setShowModal(true);
  };

  let handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "This action can't be undone.",
      type: "confirm",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, cancel please!",
      closeOnConfirm: true,
      closeOnCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(deleteMutateAsync(id), {
          loading: <b>Deleting...</b>,
          success: <b>Successfully deleted!</b>,
          error: <b>Could not delete!</b>,
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.promise(
      mutateAsync({
        _id: crypto.randomUUID().split("-")[0],
        title: text,
        description,
      }),
      {
        loading: <b>Creating...</b>,
        success: <b>Successfully created!</b>,
        error: <b>Could not create!</b>,
      }
    );
    setText("");
    setDescription("");
  };

  let ulist;
  let modify = async (from, to, item) => {
    let res = await axios.post(
      `https://kanban-board-server-one.vercel.app/sorting?collection=to-do`,
      {
        from,
        to,
        item,
        list: ulist,
      }
    );
    console.log(res);
    
  };

  let modifyAdd = async (from, to, item) => {
    let res = await axios.post(
      `https://kanban-board-server-one.vercel.app/sorting-add?collection=to-do`,
      {
        from,
        to,
        item,
        list: ulist,
      }
    );
    console.log(res);
    
  };

  return (
    <>
      {showModal && (
        <Modal
          collection="to-do"
          modalinfo={modalinfo}
          setShowModal={setShowModal}
          setCards={setCards}
        />
      )}
      <Toaster />

      <div
        className="bg-gray-200  w-11/12 sm:w-10/12 
            md:w-80 h-full pb-3 rounded-[13px] md:mr-6 mb-6 px-1"
      >
        <h2
          className="px-4 py-2 text-center 
            text-black text-lg font-bold"
        >
          {title}
        </h2>

        <article id="list" className="mx-2">
          <ReactSortable
            group="shared"
            animation={200}
            delay={1}
            swap
            id="to-do"
            multiDrag
            setList={(list) => {
              setCards(list);
              ulist = list;
              console.log("todo ", list);
            }}
            list={cards}
            onSort={(e) => {
              console.log(`sort from todo`);
              console.log(e);
              if (e.from.id === e.to.id) {
                modify(e.from.id, e.to.id, { ...e.item.dataset });
              } else if (e.from.id !== e.to.id) {
                modifyAdd(e.from.id, e.to.id, { ...e.item.dataset });
              } else {
                return;
              }
            }}
          >
            {cards.map((card) => (
              <Tile key={card._id} card={card}>
                <div className="flex justify-between items-center px-[5px]">
                  <h3 className="font-bold">{card.title}</h3>
                  <div className="flex gap-2 items-center">
                    <button onClick={() => handleEdit(card)}>
                      <FaPenToSquare className="text-blue-400 hover:cursor-pointer" />
                    </button>
                    <button onClick={() => handleDelete(card._id)}>
                      <FaTrash className="text-red-400 hover:cursor-pointer" />
                    </button>
                  </div>
                </div>
                <p className="px-[5px] text-[13px]">{card.description}</p>
              </Tile>
            ))}
          </ReactSortable>
        </article>
        {!showForm && (
          <button
            style={{ outline: "none", border: "none" }}
            className="text-sm ml-2 mt-1 
        text-blue-500 hover:bg-blue-200 transition-all px-3 py-1"
            type="button"
            onClick={() => setShowForm(true)}
          >
            + Add a card
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="w-full px-2 my-2">
            <div className="mb-3">
              <input
                style={{ border: "none", outline: "none" }}
                className="overflow-y-hidden block w-full 
                     py-2 px-2 text-sm rounded-sm"
                name="card-task"
                id="card-text"
                value={text}
                placeholder="Enter a title for this card..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div>
              <textarea
                style={{ border: "none", outline: "none" }}
                className="overflow-y-hidden block w-full 
                    py-2 px-2 text-sm rounded-sm"
                name="card-task"
                id="card-text"
                value={description}
                placeholder="Enter a description for this card..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center ml-1 mt-3">
              <button
                style={{ outline: "none", border: "none" }}
                className="block text-sm mr-5 rounded-md
                        text-white bg-blue-500 hover:bg-blue-400 
                        transition-all px-3 py-2"
                type="submit"
              >
                Add Card
              </button>
              <button
                style={{ outline: "none", border: "none" }}
                className="block text-4xl text-blue-500"
                type="submit"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
            </div>
          </form>
        )}
      </div>
      <DoingBoard title="Doing" />
    </>
  );
}

export default memo(TodoBoard);
