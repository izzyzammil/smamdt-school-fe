import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker";
import DefaultProfile from "../../image/default-profile.png";
import "react-datepicker/dist/react-datepicker.css";

export const AddStudent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      nisn: "",
      registrationId: "",
      name: "",
      placeOfBirth: "",
      birthDate: new Date(),
      address: "",
      motherName: "",
      fatherName: "",
      gender: "",
      email: "",
      dateOfEntry: new Date(),
      status: "",
    },
    onSubmit: async (e) => {
      const formData = new FormData();
      // Object.entries(values).forEach(([key, value]) => formData.append(key, value));

      formData.append("nisn", values.nisn);
      formData.append("registrationId", values.registrationId);
      formData.append("name", values.name);
      formData.append("placeOfBirth", values.placeOfBirth);
      formData.append("birthDate", values.birthDate);
      formData.append("address", values.address);
      formData.append("motherName", values.motherName);
      formData.append("fatherName", values.fatherName);
      formData.append("email", values.email);
      formData.append("dateOfEntry", values.dateOfEntry);
      formData.append("gender", values.gender);
      formData.append("status", values.status);
      if (file) {
        formData.append("studentFile", file);
      }

      try {
        await axios.post("http://localhost:3333/v1/students/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/");
      } catch (err) {
        console.log(err.response.data);
      }
    },
  });

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const formList = [
    {
      key: "nisn",
      label: "NISN",
      placeholder: "Silahkan isikan Nisn",
    },
    {
      key: "registrationId",
      label: "No. Induk",
      placeholder: "Silahkan isikan No. Induk",
    },
    {
      key: "name",
      label: "Nama",
      placeholder: "Silahkan isikan Nama",
    },
    {
      key: "placeOfBirth",
      label: "Tempat Lahir",
      placeholder: "Silahkan isikan Tempat Lahir",
    },
    {
      key: "birthDate",
      label: "Tanggal Lahir",
      placeholder: "Silahkan isikan Tanggal Lahir",
      type: "PickerDate",
    },
    {
      key: "address",
      label: "Alamat",
      placeholder: "Silahkan isikan Alamat",
    },
    {
      key: "motherName",
      label: "Nama Ibu",
      placeholder: "Silahkan isikan Nama Ibu",
    },
    {
      key: "fatherName",
      label: "Nama Ayah",
      placeholder: "Silahkan isikan Nama Ayah",
    },
    {
      key: "gender",
      label: "Jenis Kelamin",
      placeholder: "Silahkan pilih Jenis Kelamin",
      type: "Select",
      option: [
        { label: "Laki-laki", value: "Laki_laki" },
        { label: "Perempuan", value: "Perempuan" },
      ],
    },
    {
      key: "email",
      label: "Email",
      placeholder: "Silahkan isikan Email",
    },
    {
      key: "dateOfEntry",
      label: "Tanggal Masuk",
      placeholder: "Silahkan pilih Tanggal Masuk",
      type: "PickerDate",
    },
    {
      key: "status",
      label: "Status",
      placeholder: "Silahkan pilih Status",
      type: "Select",
      option: [
        { label: "Siswa Baru", value: "Siswa_Baru" },
        { label: "Pindahan", value: "Pindahan" },
        { label: "Lulus", value: "Lulus" },
        { label: "Tidak Lulus", value: "Tidak_Lulus" },
        { label: "Berhenti", value: "Berhenti" },
      ],
    },
    {
      key: "studentFile",
      label: "Image",
      placeholder: "",
      type: "File",
    },
  ];

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={handleSubmit} className="my-10">
        <div className="flex flex-col">
          {formList.map((item, index) => (
            <div className="mb-5" key={index}>
              {item.type === "Select" || item.type === "PickerDate" || item.type === "File" ? (
                <div>
                  <label htmlFor="" className="font-bold text-slate-700">
                    {item.label}
                  </label>
                  {item.type === "Select" ? (
                    <Select
                      options={item.option}
                      className="w-full mt-1 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder={item.placeholder}
                      onChange={(e) => setFieldValue(item.key, e.value)}
                    />
                  ) : item.type === "PickerDate" ? (
                    <DatePicker
                      selected={values[item.key]}
                      onChange={(date) => setFieldValue(item.key, date)}
                      dateFormat="dd-MM-yyyy"
                      className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  ) : (
                    <div className="flex items-center space-x-6 mt-2">
                      <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-full" src={preview ? preview : DefaultProfile} alt="profile-student" />
                      </div>
                      <label className="block">
                        <span className="sr-only">Choose File</span>
                        <input
                          type="file"
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-200 file:text-black hover:file:bg-slate-400"
                          onChange={loadImage}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label htmlFor="" className="font-bold text-slate-700">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder={item.placeholder}
                    value={values[item.key]}
                    onChange={handleChange(item.key)}
                  />
                </div>
              )}
            </div>
          ))}

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
