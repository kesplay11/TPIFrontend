import ProtectedRoute from "../services/ProtectedRoute";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { NotificationProvider } from "./NotificationProvider";

export default function DashboardRoute({ children }) {
    return (
        <ProtectedRoute>
            <NotificationProvider>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </NotificationProvider>
        </ProtectedRoute>
    );
}
