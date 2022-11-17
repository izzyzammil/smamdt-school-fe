import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {
  const [nisn, setNisn] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3333/students", { nisn, name });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={saveProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label htmlFor="" className="font-bold text-slate-700">
              Nisn
            </label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Silahkan Isikan Nisn"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="" className="font-bold text-slate-700">
              Nama
            </label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Silahkan Isikan Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};
