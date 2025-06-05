import React, {  useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import { Camera, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QRScanPage() {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  };

  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const startScanning = () => {
    // Dans un vrai cas, nous intégrerions ici une bibliothèque de scan QR
    // Pour notre maquette, simulons une détection après 2 secondes
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setResult({
        valid: true,
        bulletin: {
          id: 123,
          month: "Mars",
          year: 2025,
          employee: "Jean Dupont",
          company: "ACME Inc.",
        },
      });
    }, 2000);
  };

  const resetScan = () => {
    setResult(null);
  };

  return (
    <MainLayout userInitial="J">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Scanner un QR Code
        </h2>
        <button
          onClick={() => navigateTo("bulletins")}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-gray-600 mb-4 text-center">
          Scannez le QR code présent sur votre bulletin de paie pour vérifier
          son authenticité.
        </p>

        {!scanning && !result && (
          <div className="flex justify-center">
            <Button
              variant="primary"
              icon={<Camera size={18} />}
              onClick={startScanning}
            >
              Commencer le scan
            </Button>
          </div>
        )}

        {scanning && (
          <div className="relative h-64 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-pulse mb-2">
                <Camera size={48} className="mx-auto" />
              </div>
              <p>Recherche de QR code...</p>
              <p className="text-sm text-gray-400 mt-1">
                Positionnez le QR code dans le cadre
              </p>
            </div>
            <div className="absolute inset-0 border-2 border-blue-500 opacity-50 m-8 rounded"></div>
          </div>
        )}

        {result && (
          <div
            className={`p-4 rounded-lg mb-4 ${
              result.valid
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center mb-3">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  result.valid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.valid ? "✓" : "✗"}
              </div>
              <h3
                className={`ml-2 font-medium ${
                  result.valid ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.valid ? "Document authentique" : "Document non reconnu"}
              </h3>
            </div>

            {result.valid && result.bulletin && (
              <div className="pl-10">
                <p className="text-sm text-gray-700">
                  Bulletin de salaire - {result.bulletin.month}{" "}
                  {result.bulletin.year}
                </p>
                <p className="text-sm text-gray-700">
                  Employé: {result.bulletin.employee}
                </p>
                <p className="text-sm text-gray-700">
                  Société: {result.bulletin.company}
                </p>
              </div>
            )}

            <div className="mt-4 flex justify-center">
              <Button
                variant={result.valid ? "success" : "primary"}
                onClick={resetScan}
              >
                Scanner un autre document
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
