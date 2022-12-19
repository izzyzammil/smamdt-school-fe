import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditStudent = () => {
  const [nisn, setNisn] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getStudentByNisn = async () => {
      const response = await axios.get(`http://localhost:3333/v1/students/${id}`);
      setNisn(response.data.data.nisn);
      setName(response.data.data.name);
    };
    getStudentByNisn();
  }, [id]);

  const updateStudent = async (e) => {
    e.preventDefault();

    await axios.patch(`http://localhost:3333/v1/students/${id}`, {
      nisn,
      name,
    });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={updateStudent} className="my-10">
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
              disabled
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
