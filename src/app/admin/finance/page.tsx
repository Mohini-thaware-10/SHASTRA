import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  InstitutionData,
  getInstitutionData,
} from "@/data/admin/institution-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export function AdminFinancePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get administrator ID from query param
  const adminId = searchParams.get("adminId") || "admin-1";

  // Verify administrator access
  const institution = useDataProvider().getInstitutionData(adminId);

  if (!institution) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending administrator account.</p>
        <button
          onClick={() => router.push("/sign-in?role=admin")}
          className="mt-4 btn-primary"
        >
          Sign In as Administrator
        </button>
      </div>
    );
  }

  // Mock finance data
  const financialRecords = [
    { id: "fi-1", category: " tuition Fees", type: "Income", amount: 1250000, date: "2024-04-15", status: "collected", term: "Quarter 1 2024-25" },
    { id: "fi-2", category: " Examination Fees", type: "Income", amount: 350000, date: "2024-05-01", status: "collected", term: "Quarter 1 2024-25" },
    { id: "fi-3", category: " Transport Fees", type: "Income", amount: 200000, date: "2024-04-01", status: "collected", term: "Quarter 1 2024-25" },
    { id: "fi-4", category: " Salary Expenses", type: "Expense", amount: 850000, date: "2024-05-15", status: "paid", term: "Quarter 2 2024-25" },
    { id: "fi-5", category: " Utilities Expenses", type: "Expense", amount: 150000, date: "2024-05-10", status: "paid", term: "Quarter 2 2024-25" },
    { id: "fi-6", category: " Maintenance Expenses", type: "Expense", amount: 100000, date: "2024-05-05", status: "pending", term: "Quarter 2 2024-25" },
    { id: "fi-7", category: " Library Fees", type: "Income", amount: 80000, date: "2024-04-20", status: "collected", term: "Quarter 1 2024-25" },
    { id: "fi-8", category: " Activity Fees", type: "Income", amount: 60000, date: "2024-05-12", status: "collected", term: "Quarter 2 2024-25" },
  ];

  // Filters
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [typeFilter, setTypeFilter] = useState<string | null>("all");

  const filteredRecords = financialRecords.filter((record) => {
    const statusMatch = statusFilter === "all" ? true : record.status === statusFilter;
    const typeMatch = typeFilter === "all" ? true : record.type === typeFilter;
    return statusMatch && typeMatch;
  });

  // Calculate totals
  const totalIncome = filteredRecords
    .filter((r) => r.type === "Income")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = filteredRecords
    .filter((r) => r.type === "Expense")
    .reduce((sum, r) => sum + r.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/finance"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Institutional Finance */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Institutional Finance
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample financial records for institutional administration.
                </br>
                Prototype data — not connected to live financial systems.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="collected">Collected</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
            </section>

            {/* Finance Summary Cards */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Income</p>
                  <p className="font-medium text-2xl text-success">₹{totalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
                  <p className="font-medium text-2xl text-error">₹{totalExpense.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Net Balance</p>
                  <p className="font-medium text-2xl {netBalance >= 0 ? "text-success" : "text-error"}">
                    ₹{netBalance.toLocaleString()}
                    </br>
                    {netBalance >= 0 ? "Surplus" : "Deficit"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Prototype financial data for institutional demonstration purposes.
                </br>
                All figures are sample data and not connected to live accounting systems.
                </br>
                Actual financial reporting through authorized administrators only.
              </p>
            </section>

            {/* Financial Records Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Financial Records</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Category</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Term</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{record.category}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-2 py-1 rounded text-xs", "bg-primary/10 text-primary")}>
                            {record.type}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium">{record.amount}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{record.date}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs",
                              `bg-${record.status === "collected" ? "success" : record.status === "paid" ? "success" : "warning"}/${20} text-${record.status === "collected" ? "success" : record.status === "paid" ? "success" : "warning"}`
                            )}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{record.term}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Finance Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Financial records data is prototype-only for institutional administration demonstration</li>
                <li>All financial records are sample data and not connected to live accounting systems</li>
                <li>Financial tracking is prototype-only — actual financial management through authorized finance departments</li>
                <li>All figures are illustrative and for demonstration purposes only</li>
                <li>All data is prototype-only and not connected to external databases</li>
                <li>Sensitive financial information should be handled according to institutional policies</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}