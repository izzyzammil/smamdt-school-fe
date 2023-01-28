import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DefaultProfile from "../../Image/default-profile.png";

export const StudentList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:3333/v1/students/list");
    return response.data.data;
  };

  const { data } = useSWR("students", fetcher);
  if (!data) return <h2>Loading....</h2>;

  const deleteProduct = async (nisn: string) => {
    await axios.delete(`http://localhost:3333/v1/students/${nisn}`);
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
                <th className="py-3 px-2 text-center">No</th>
                <th className="py-3 px-6">Profil</th>
                <th className="py-3 px-6">Nisn</th>
                <th className="py-3 px-6 text-center">No Induk</th>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">Gender</th>
                <th className="py-3 px-6">Alamat</th>
                <th className="py-3 px-6">Tanggal Masuk</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr className="bg-white border-b hover:bg-gray-300" key={index}>
                  <td className="py-3 px-2 text-center">{index + 1}</td>
                  <td className="py-3 px-6">
                    <div className="shrink-0">
                      <img
                        className="h-10 w-10 object-cover rounded-full"
                        src={item.studentUrl ? item.studentUrl : DefaultProfile}
                        alt="profile-student"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-6">{item.nisn}</td>
                  <td className="py-3 px-6 text-center">{item.registrationId}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.gender === "Laki_laki" ? "Laki-laki" : item.gender}</td>
                  <td className="py-3 px-6">{item.address}</td>
                  <td className="py-3 px-6">{moment(item.dateOfEntry).format("DD-MM-YYYY")}</td>
                  <td className="py-3 px-6">{item.status === "Siswa_Baru" ? "Siswa Baru" : item.status}</td>
                  <td className="py-3 px-2 text-center">
                    <div>
                      <button onClick={() => {}} className="font-medium bg-green-600 hover:bg-green-400 px-2 py-2 rounded text-white">
                        <FontAwesomeIcon icon={faEye} size="lg" />
                      </button>
                      <Link to={`/edit/${item.id}`} className="font-medium bg-blue-600 hover:bg-blue-400 px-2 py-2 rounded text-white mx-1">
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(item.nisn)}
                        className="font-medium bg-red-600 hover:bg-red-400 px-2 py-2 rounded text-white"
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                    </div>
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
