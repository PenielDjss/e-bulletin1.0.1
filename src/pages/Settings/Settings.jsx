import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Save, Bell, Lock, User } from 'lucide-react';

export default function Settings() {
    return (
        <MainLayout userInitial="J">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Paramètres</h2>
                <p className="text-gray-500 text-sm">Configurer votre compte et vos préférences</p>
            </div>

            <div className="space-y-6">
                <Card title="Profil">
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-medium">
                            J
                        </div>
                        <div className="ml-4">
                            <h3 className="font-medium text-gray-800">Jean Dupont</h3>
                            <p className="text-gray-500 text-sm">jean.dupont@example.com</p>
                        </div>
                    </div>

                    <Input
                        label="Nom d'utilisateur"
                        value="Jean Dupont"
                        onChange={() => {}}
                        icon={<User size={18} className="text-gray-400" />}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value="jean.dupont@example.com"
                        onChange={() => {}}
                    />

                    <div className="mt-4">
                        <Button variant="primary" icon={<Save size={18} />}>
                            Enregistrer
                        </Button>
                    </div>
                </Card>

                <Card title="Sécurité">
                    <Button variant="outline" icon={<Lock size={18} />} fullWidth className="justify-start">
                        Changer le mot de passe
                    </Button>
                </Card>

                <Card title="Notifications">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Bell size={18} className="text-gray-600 mr-2" />
                                <div>
                                    <p className="text-gray-800">Bulletins de paie</p>
                                    <p className="text-gray-500 text-sm">Recevoir une notification quand un nouveau bulletin est disponible</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Bell size={18} className="text-gray-600 mr-2" />
                                <div>
                                    <p className="text-gray-800">Demandes de congés</p>
                                    <p className="text-gray-500 text-sm">Recevoir une notification quand une demande est traitée</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
}