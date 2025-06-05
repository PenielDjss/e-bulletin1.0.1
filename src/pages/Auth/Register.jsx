import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { User, Lock, KeyRound, Hash } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from "framer-motion";

export default function Register({userData}) {
  const navigate = useNavigate();
    const {register} = useAuth();
  
  const [step, setStep] = useState(1); // Étape actuelle
  const [formData, setFormData] = useState({
    matricule: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Ici, tu pourras ajouter la logique d'appel API à chaque étape
    if (step === 1 && formData.matricule.trim() !== "") {
      console.log("\nEnvoie de:",formData.matricule,"\n",
        "Réception de : mail.test@gmail.com\n",
        "info: Code envoyé ✅"
      );
      // Simule la vérification du matricule
      setStep(2);
    } else if (step === 2 && formData.otp.length === 6) {
      // Simule la vérification du code OTP
      setStep(3);
    } else if (step === 3) {
      // Vérification finale (mot de passe = confirmation)
      if (formData.password === formData.confirmPassword) {
        console.log("Inscription complète ✅", formData);
        // Appel API ici pour créer le compte
      } else {
        alert("Les mots de passe ne correspondent pas.");
      }
    }
  };

 

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Inscrivez-vous avec votre matricule";
      case 2:
        return "Entrez le code reçu par email";
      case 3:
        return "Définissez votre mot de passe";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    return step < 3 ? "Suivant" : "Créer le compte";
  };

  // Variants d'animation pour les étapes
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Appel API d'authentification ici
      await register(userData);
      navigate('/bulletins');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-700">
      {/* Section image - cachée sur mobile */}
      <div className="flex-1 hidden md:block bg-[url(src/assets/img/5.png)] bg-cover relative">
        <motion.p
          className="text-slate-50 absolute top-72 left-0 ml-16 text-left text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Consultez vos bulletins de paie <br />
          et faites vos demandes de congés <br />
          au même endroit !
        </motion.p>

        <p className="text-slate-50 absolute bottom-8 left-1/2 transform -translate-x-1/2">
          Powered by{" "}
          <span className="text-lg font-k2d font-bold text-slate-50">
            Perfect Pro Soft
          </span>
        </p>
      </div>

      {/* Section formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 bg-gray-50 md:rounded-l-3xl py-12">
        <div className="w-full max-w-md">
          {/* Texte affiché uniquement sur mobile */}
          <motion.div 
            className="md:hidden text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-gray-700 text-lg mb-4">
              Consultez vos bulletins de paie <br />
              et faites vos demandes de congés <br />
              au même endroit !
            </p>
            <p className="text-gray-600 text-sm">
              Powered by{" "}
              <span className="font-k2d font-bold text-blue-600">
                Perfect Pro Soft
              </span>
            </p>
          </motion.div>

          {/* En-tête avec animation */}
          <motion.div 
            className="text-center mb-4"
            key={step}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              e-Bulletin
            </h1>
            <p className="text-gray-600">{getStepTitle()}</p>
          </motion.div>

          {/* Indicateur d'étapes */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <motion.div
                  key={stepNumber}
                  className={`w-3 h-3 rounded-full ${
                    stepNumber <= step ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: stepNumber * 0.1 }}
                />
              ))}
            </div>
          </div>

          <Card className="border-slate-300 border-2">
            <form onSubmit={handleNext}>
              <motion.div
                key={step}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <Input
                    label="Matricule"
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleChange}
                    placeholder="****564"
                    required
                    icon={<Hash size={18} className="text-gray-400" />}
                  />
                )}

                {step === 2 && (
                  <Input
                    label="Code OTP"
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Entrez le code reçu"
                    maxLength={6}
                    required
                    icon={<KeyRound size={18} className="text-gray-400" />}
                  />
                )}

                {step === 3 && (
                  <>
                    <Input
                      label="Mot de passe"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********"
                      required
                      icon={<Lock size={18} className="text-gray-400" />}
                    />
                    <Input
                      label="Confirmer le mot de passe"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="********"
                      required
                      icon={<Lock size={18} className="text-gray-400" />}
                    />
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="primary" fullWidth type="submit">
                  {getButtonText()}
                </Button>
              </motion.div>
            </form>

            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Connexion
                </a>
              </p>
            </motion.div>
          </Card>
        </div>
      </div>
    </div>
  );
}