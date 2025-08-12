'use client'
import { useEffect, useState } from "react";
import { useValidation } from "@/_hooks/useValidate";
import AdminLayout from "./admin/layout/AdminLayout";
import ErrorBoundary from "./admin/layout/ErrorBoundary";
import ModernGallery from "./admin/galery/ModernGallery";
import Dashboard from "./dashboard";
import ModernHome from "./admin/home/ModernHome";
import ModernAbout from "./admin/about/ModernAbout";
import ModernObras from "./admin/obras/ModernObras";
import ModernContacts from "./admin/contact/ModernContacts";

export default function Sidebar() {
    const [currentStep, setCurrentStep] = useState<string>("Obras")
    const sysValidation = useValidation();

    const validateLogin = async () => {
        await sysValidation(async (token: string) => {
            true;
        });
    }
    
    useEffect(() => {
        validateLogin();
    }, [])

    const renderStep = () => {
        switch (currentStep) {
            case 'Galeria':
                return <ModernGallery />
            case 'Home':
                return <ModernHome />
            case 'Obras':
                return <ModernObras />
            case 'Sobre nós':
                return <ModernAbout />
            case 'Contatos':
                return <ModernContacts />
            default:
                return <Dashboard />
        }
    }

    return (
        <ErrorBoundary>
            <AdminLayout 
                currentStep={currentStep} 
                onStepChange={setCurrentStep}
            >
                {renderStep()}
            </AdminLayout>
        </ErrorBoundary>
    )
}

