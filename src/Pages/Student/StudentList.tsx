import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import DefaultProfile from "../../Image/default-profile.png";
import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../../API";
import { DetailStudent } from "./DetailStudent";
import { Student } from "@/Types";

export const StudentList = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detail, setDetail] = useState<Student | undefined>(undefined);

  const { data: dataStudent, isFetching } = useQuery(["student", "list"], () => studentApi.getStudents(), {
    enabled: true,
    onSuccess: async (res) => res.data,
    onError: async (err: any) => {
      console.log("Failed get data student", err);
    },
  });

  if (!dataStudent && isFetching) return <h2>Loading....</h2>;

  const handleOpenDetail = (record: Student) => {
    setDetail(record);
    setIsOpenDetail(true);
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg">
        Tambah Siswa
      </Link>
      <div className="overflow-x-auto w-full my-4 rounded-xl shadow-md">
        <table className="table w-full border-collapse table-compact">
          <thead>
            <tr className="text-center ">
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
              <tr key={index} className="hover">
                <td className="text-center border-2 border-gray-300">{index + 1}</td>
                <td className="border-2 border-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.studentUrl ? item.studentUrl : DefaultProfile} alt="profile-student" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-70">{item.address}</div>
                    </div>
                  </div>
                </td>
                <td className="border-2 border-gray-300">
                  {item.gender.replace("_", "-")}
                  <br />
                  <span className="badge badge-ghost badge-sm">{moment(item.birthDate).format("DD-MM-YYYY")}</span>
                </td>
                <td className="border-2 border-gray-300">
                  <div>
                    <div className="text-xs opacity-70">
                      No. Induk: <span className="text-sm font-medium text-black opacity-100">{item.registrationId}</span>
                    </div>
                    <div className="font-medium">{item.nisn}</div>
                  </div>
                </td>
                <td className="border-2 border-gray-300">
                  <div>
                    <div className="text-sm">{item.status.replace("_", " ")}</div>
                    <div className="font-medium">{moment(item.dateOfEntry).format("DD-MM-YYYY")}</div>
                  </div>
                </td>
                <td className="border-2 border-gray-300">
                  <div className="flex justify-center space-x-1">
                    <button onClick={() => handleOpenDetail(item)} className="bg-green-600 hover:bg-green-400 px-2 py-2 rounded-lg text-white">
                      <FontAwesomeIcon icon={faEye} size="lg" />
                    </button>
                    <Link to={`/edit/${item.id}`} className="bg-blue-600 hover:bg-blue-400 px-2 py-2 rounded-lg text-white">
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DetailStudent isOpen={isOpenDetail} title={`Detail: ${detail?.name}`} onClose={() => setIsOpenDetail(false)} detail={detail} />
    </div>
  );
};
