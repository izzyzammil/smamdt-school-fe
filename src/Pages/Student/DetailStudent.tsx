import React from "react";
import { formatDate } from "../../Utils";
import { BasicModal } from "../../Components/BasicModal";
import { Student } from "../../Types";
import { DetailContent } from "../../Components/DetailContent";

interface DetailModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  detail?: Student;
}

export const DetailStudent = ({ isOpen = false, onClose, title, detail }: DetailModalProps) => {
  const detailList = [
    { label: "ID", value: detail?.id },
    { label: "NISN", value: detail?.nisn },
    { label: "No Induk", value: detail?.registrationId },
    { label: "Nama", value: detail?.name },
    { label: "Jenis Kelamin", value: detail?.gender.replace("_", "-") },
    { label: "Tempat Lahir", value: detail?.placeOfBirth },
    { label: "Tanggal Lahir", value: formatDate(detail?.birthDate as string, "DD/MM/YYYY") },
    { label: "Alamat", value: detail?.address },
    { label: "Nama Ibu", value: detail?.motherName },
    { label: "Nama Ayah", value: detail?.fatherName },
    { label: "Email", value: detail?.email },
    { label: "Tanggal Masuk", value: formatDate(detail?.dateOfEntry as string, "DD/MM/YYYY") },
    { label: "Status", value: detail?.status.replace("_", " ") },
    {
      label: "Tanggal Buat",
      value: formatDate(detail?.createdAt as string, "DD/MM/YYYY"),
    },
  ];

  return (
    <BasicModal isOpen={isOpen} title={title} onClose={onClose}>
      <DetailContent detail={detail} detailList={detailList} />
    </BasicModal>
  );
};
