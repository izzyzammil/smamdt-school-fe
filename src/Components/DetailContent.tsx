import React from "react";

interface DetailContentProps {
  detail: any;
  detailList: {
    label: string;
    value: any;
  }[];
}

export const DetailContent = ({ detail, detailList }: DetailContentProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      {detail && (
        <tbody className="divide-y divide-gray-200 bg-white">
          {detailList.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{item.label}</td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{item.value}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};
