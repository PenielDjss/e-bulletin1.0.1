import React, {useContext, useState} from 'react';
import {Download, Share2, Eye, QrCode, X, Camera} from 'lucide-react';
import Button from '../../components/Button';
import { useNavigate, useParams} from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

export default function BulletinDetail() {
    
    const navigate = useNavigate();
    const { id } = useParams(); // Récupère l'ID du bulletin depuis l'URL
    const {month, year} = useParams(); // Récupère le mois et l'année du bulletin depuis l'URL

    const navigateTo = (page) => {
        navigate(`/${page}`);
    }


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
                    month: 'Mars',
                    year: 2025,
                    employee: 'Jean Dupont',
                    company: 'ACME Inc.'
                }
            });
        }, 2000);
    };

    

    return (
        <MainLayout userInitial="J">
            <div className="flex items-center justify-between mb-6">
                {/* Titre avec le mois et l'année du bulletin */}
                <h2 className="text-xl font-semibold text-gray-800">Bulletin de {month} {year} </h2>
                <button
                    onClick={() => navigateTo('bulletins')}
                    className="p-2 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <p className="text-gray-600 mb-4 text-center">
                    PDF de votre bulletin du mois de "month".
                </p>
            </div>
        </MainLayout>
    );

}