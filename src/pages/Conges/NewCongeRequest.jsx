import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PeriodState from "../../components/PeriodState";
import { Calendar, X, Clock, FileText, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";

export default function NewCongeRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    datedemande: "",
    motif: "",
    type: "",
  });
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [duree, setDuree] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Soumission:", { ...formData, selectedPeriod, duree });
    navigate("/conges");
  };

  return (
    <MainLayout userInitial="J">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/conges")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-500" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            Nouvelle demande de congé
          </h2>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <motion.div className="flex items-center space-x-12">
                  {['Informations', 'Période', 'Confirmation'].map((step, index) => (
                    <motion.div
                      key={step}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        {index + 1}
                      </div>
                      <span className="text-sm mt-2 text-gray-600">{step}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date et Durée */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Input
                      label="Date de début"
                      type="date"
                      name="datedemande"
                      value={formData.datedemande}
                      onChange={handleChange}
                      required
                      icon={<Calendar size={18} />}
                      className="w-full"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <PeriodState
                      initialCount={duree}
                      onChange={(value) => setDuree(value)}
                      className="w-full"
                      label="Durée"
                      icon={<Clock size={18} />}
                    />
                  </motion.div>
                </div>

                {/* Type de congé */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Select
                    label="Type de congé"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    options={[
                      { value: "cp", label: "Congés payés" },
                      { value: "rtt", label: "RTT" },
                      { value: "maladie", label: "Congé maladie" },
                      { value: "special", label: "Congé spécial" },
                    ]}
                    icon={<CalendarIcon size={18} />}
                  />
                </motion.div>

                {/* Motif */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Input
                    label="Motif"
                    type="textarea"
                    name="motif"
                    value={formData.motif}
                    onChange={handleChange}
                    placeholder="Décrivez brièvement le motif de votre demande"
                    required
                    icon={<FileText size={18} />}
                    className="h-32"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-end pt-4"
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-8"
                  >
                    Soumettre la demande
                  </Button>
                </motion.div>
              </form>
            </div>
          </Card>
        </div>
      </motion.div>
    </MainLayout>
  );
}
