import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ImageCarousel from "../../components/ImageCarousel";
import { Download, Share2, Eye, QrCode } from "lucide-react";

import { useNavigate } from "react-router-dom";

// Données de test pour les personnes
// const people = [
//   {
//     name: "Leslie Alexander",
//     email: "leslie.alexander@example.com",
//     role: "Co-Founder / CEO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Michael Foster",
//     email: "michael.foster@example.com",
//     role: "Co-Founder / CTO",
//     imageUrl:
//       "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Dries Vincent",
//     email: "dries.vincent@example.com",
//     role: "Business Relations",
//     imageUrl:
//       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
//   {
//     name: "Lindsay Walton",
//     email: "lindsay.walton@example.com",
//     role: "Front-end Developer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Courtney Henry",
//     email: "courtney.henry@example.com",
//     role: "Designer",
//     imageUrl:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: "3h ago",
//     lastSeenDateTime: "2023-01-23T13:23Z",
//   },
//   {
//     name: "Tom Cook",
//     email: "tom.cook@example.com",
//     role: "Director of Product",
//     imageUrl:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     lastSeen: null,
//   },
// ];

// Données de test pour les bulletins
const bulletins = [
  {
    id: 1,
    month: "Mars",
    year: 2025,
    amount: "355.242 F CFA",
    date: "28/03/2025",
    status: "Nouveau",
  },
  {
    id: 2,
    month: "Février",
    year: 2025,
    amount: "355.242 F CFA",
    date: "28/02/2025",
    status: "Disponible",
  },
  {
    id: 3,
    month: "Janvier",
    year: 2025,
    amount: "355.242 F CFA",
    date: "28/01/2025",
    status: "Disponible",
  },
  {
    id: 4,
    month: "Décembre",
    year: 2024,
    amount: "398.242 F CFA",
    date: "21/12/2024",
    status: "Disponible",
  },
];

export default function BulletinsList() {
  // const { navigate } = useContext(NavigationContext);
  const navigate = useNavigate();
  return (
    <MainLayout userInitial="J">
      <div>
        <ImageCarousel />
      </div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Mes Bulletins de paies
        </h2>
        <Button
          variant="primary"
          icon={<QrCode size={16} className="mr-2" />}
          onClick={() => navigate("/qr-scan")}
        >
          Scanner
        </Button>
      </div>

      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">  
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Période
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Montant
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bulletins.map((bulletin) => (
              <tr
                key={bulletin.id}
                onClick={() =>
                  navigate(`/bulletins/${bulletin.month}/${bulletin.year}`)
                }
                className="hover:bg-blue-100 cursor-pointer transition-colors duration-200"
              >
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {bulletin.month} {bulletin.year}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                  {bulletin.amount}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {bulletin.status}
                  </span>
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                  {bulletin.date}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/bulletins/${bulletin.month}/${bulletin.year}`
                        );
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Télécharger bulletin ${bulletin.id}`);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Partager bulletin ${bulletin.id}`);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </MainLayout>
  );
}
