import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

export const StudentList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:3333/students");
    return response.data.data;
  };

  const { data } = useSWR("students", fetcher);
  if (!data) return <h2>Loading....</h2>;

  const deleteProduct = async (nisn) => {
    await axios.delete(`http://localhost:3333/students/${nisn}`);
    mutate("students");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link to="/add" className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg">
          Tambah Siswa
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Nisn</th>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="bg-white border-b" key={index}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6">{item.nisn}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-1 text-center">
                    <Link to={`/edit/${item.nisn}`} className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1">
                      Edit
                    </Link>
                    <button onClick={() => deleteProduct(item.nisn)} className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
