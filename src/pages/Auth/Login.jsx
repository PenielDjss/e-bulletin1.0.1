import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { User, Lock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from "framer-motion";

export default function Login({ userData }) {
  const navigate = useNavigate();
  const {login} = useAuth();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Appel API d'authentification ici
      await login(userData);
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
      <div className="flex-1 flex items-center justify-center px-4 bg-gray-50 md:rounded-l-3xl">
        <div className="w-full max-w-sm">
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

          <motion.div 
                      className="text-center mb-4"
                      
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
          {/* <div className="text-center mb-8"> */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              e-Bulletin
            </h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à vos bulletins
            </p>
          {/* </div> */}
          </motion.div>

          <Card className="border-slate-300 border-2">
            <form onSubmit={handleSubmit}>
              <Input
                label="Adresse email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                icon={<User size={18} className="text-gray-400" />}
              />

              <Input
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                required
                icon={<Lock size={18} className="text-gray-400" />}
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Mot de passe oublié?
                  </a>
                </div>
              </div>

              <Button variant="primary" fullWidth type="submit">
                Connexion
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte?{" "}
                <a
                  href="/signin"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  
                >
                  Inscription
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}