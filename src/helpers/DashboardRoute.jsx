import ProtectedRoute from "../services/ProtectedRoute";
import DashboardLayout from "../features/Dashboard/DashboardLayout";

export default function DashboardRoute({ children, ...props }){
    return (
        <ProtectedRoute>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </ProtectedRoute>
    )
}