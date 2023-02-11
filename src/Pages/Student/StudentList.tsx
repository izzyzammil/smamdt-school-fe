import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DefaultProfile from "../../Image/default-profile.png";
import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../../API";

export const StudentList = () => {
  // const [record, setRecord] = useState([]);

  const { data: dataStudent, isFetching } = useQuery(["student", "list"], () => studentApi.getStudents(), {
    enabled: true,
    onSuccess: async (res) => res.data,
    onError: async (err: any) => {
      console.log("Failed get data student", err);
    },
  });

  if (!dataStudent && isFetching) return <h2>Loading....</h2>;

  // const deleteProduct = async (nisn: string) => {
  //   await axios.delete(`http://localhost:3333/v1/students/${nisn}`);
  //   mutate("students");
  // };

  return (
    <div className="container mt-5">
      <Link to="/add" className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg">
        Tambah Siswa
      </Link>
      <div className="overflow-x-auto w-full my-4 rounded-xl shadow-md">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="text-center">
              <th className="border-2 border-white">No</th>
              <th colSpan={2} className="border-2 border-white">
                Profil
              </th>
              <th className="border-2 border-white">No Registrasi</th>
              <th className="border-2 border-white">Status</th>
              <th className="border-2 border-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataStudent.data.map((item: any, index: number) => (
              <tr key={index}>
                <td className="text-center border-2 border-gray-200">{index + 1}</td>
                <td className="border-2 border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.studentUrl ? item.studentUrl : DefaultProfile} alt="profile-student" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.address}</div>
                    </div>
                  </div>
                </td>
                <td className="border-2 border-gray-200">
                  {item.gender}
                  <br />
                  <span className="badge badge-ghost badge-sm">{moment(item.birthDate).format("DD-MM-YYYY")}</span>
                </td>
                <td className="border-2 border-gray-200">
                  <div>
                    <div className="text-sm opacity-50">{item.registrationId}</div>
                    <div className="font-bold">{item.nisn}</div>
                  </div>
                </td>
                <td className="border-2 border-gray-200">
                  <div>
                    <div className="text-sm opacity-50">{item.status}</div>
                    <div className="font-bold">{moment(item.dateOfEntry).format("DD-MM-YYYY")}</div>
                  </div>
                </td>
                <td className="border-2 border-gray-200">
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
