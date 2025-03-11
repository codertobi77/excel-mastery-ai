"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FiUser, FiMail, FiLock, FiEdit2, FiSave, FiX, FiAlertCircle } from "react-icons/fi";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

export default function Profile() {
    const { data: session, update: updateSession } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({    
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // Mise à jour de la session
      await updateSession({
        ...session,
        user: {
          ...session?.user,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
          email: data.user.email,
        },
      });

      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
      
      // Réinitialiser les champs de mot de passe
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-black dark:to-green-950">
      <div className="container-custom py-10">
        <FadeIn>
          <h1 className="heading-1 mb-8">Profil</h1>
        </FadeIn>

        <div className="max-w-2xl mx-auto">
          {/* Informations de base */}
          <FadeIn delay={0.1}>
            <div className="card mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading-2">Informations Personnelles</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                >
                  {isEditing ? (
                    <>
                      <FiX className="w-4 h-4" />
                      <span>Annuler</span>
                    </>
                  ) : (
                    <>
                      <FiEdit2 className="w-4 h-4" />
                      <span>Modifier</span>
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Photo de profil */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-600/20 rounded-full flex items-center justify-center">
                      <FiUser className="w-10 h-10 text-green-600 dark:text-green-500" />
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                      >
                        Changer la photo
                      </button>
                    )}
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="input-field"
                    />
                  </div>
                  

                  {/* Prénom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="input-field"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="input-field"
                    />
                  </div>
                </div>

                {isEditing && (
                  <FadeIn>
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Changer le mot de passe
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mot de passe actuel
                          </label>
                          <input
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirmer le mot de passe
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                )}

                {isEditing && (
                  <FadeIn>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>Enregistrer les modifications</span>
                      </button>
                    </div>
                  </FadeIn>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Préférences */}
          <FadeIn delay={0.2}>
            <div className="card">
              <h2 className="heading-2 mb-6">Préférences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium">Notifications par email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recevoir des mises à jour sur les nouveaux cours et fonctionnalités
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-500/20 dark:peer-focus:ring-green-500/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}