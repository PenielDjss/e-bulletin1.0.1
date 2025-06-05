import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Plus, Calendar } from "lucide-react";

// Données de test pour les congés
const conges = [
  {
    id: 1,
    type: "Congés payés",
    startDate: "15/05/2025",
    endDate: "22/05/2025",
    days: 5,
    status: "En attente",
  },
  {
    id: 2,
    type: "RTT",
    startDate: "05/04/2025",
    endDate: "05/04/2025",
    days: 1,
    status: "Validé",
  },
  {
    id: 3,
    type: "Congés payés",
    startDate: "20/02/2025",
    endDate: "25/02/2025",
    days: 4,
    status: "Validé",
  },
];

export default function CongesList() {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "bg-orange-100 text-orange-800";
      case "Validé":
        return "bg-green-100 text-green-800";
      case "Refusé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout userInitial="J">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Mes Congés</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gérez vos absences et consultez votre solde
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => navigate("/conges/new")}
        >
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue- to-blue-100 border-none">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Congés payés
            </h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-700">18</span>
              <span className="ml-1 text-sm text-blue-600">jours restants</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Dernière mise à jour : 5 juin 2025
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-indigo- to-indigo-100 border-none">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">RTT</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-indigo-700">5</span>
              <span className="ml-1 text-sm text-indigo-600">
                jours restants
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Dernière mise à jour : 5 juin 2025
            </div>
          </div>
        </Card>
      </div>

      {/* Table des congés */}
      <Card className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
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
                Durée
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {conges.map((conge) => (
              <tr key={conge.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{conge.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    Du {conge.startDate} au {conge.endDate}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {conge.days} jour{conge.days > 1 ? "s" : ""}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      conge.status
                    )}`}
                  >
                    {conge.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </MainLayout>
  );
}
