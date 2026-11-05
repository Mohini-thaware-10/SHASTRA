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

export function AdminLibraryPage() {
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

  // Mock library data
  const books = [
    { id: "bk-1", title: "Mathematics Class 8", author: "R.D. Sharma", class: "8", universe: "nexus", quantity: 45, available: 42, category: "Textbook" },
    { id: "bk-2", title: "Science Class 10", author: "Lakhmir Singh", class: "10", universe: "nexus", quantity: 40, available: 36, category: "Textbook" },
    { id: "bk-3", title: "Physics Class 11", author: "H.C. Verma", class: "11", universe: "ascend", quantity: 35, available: 32, category: "Textbook" },
    { id: "bk-4", title: "Chemistry Class 12", author: "O.P. Tandon", class: "12", universe: "ascend", quantity: 30, available: 27, category: "Textbook" },
    { id: "bk-5", title: "English Literature Class 7", author: "Wren & Martin", class: "7", universe: "junior", quantity: 50, available: 48, category: "Literature" },
    { id: "bk-6", title: "History Class 9", author: "Satish Chandra", class: "9", universe: "nexus", quantity: 42, available: 40, category: "Textbook" },
    { id: "bk-7", title: "Mathematics Class 5", author: "RS Aggarwal", class: "5", universe: "junior", quantity: 48, available: 45, category: "Textbook" },
    { id: "bk-8", title: "Computer Science Class 10", author: "Sumita Arora", class: "10", universe: "nexus", quantity: 38, available: 35, category: "Elective" },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredBooks = books.filter((book) => {
    const universeMatch = !universeFilter || book.universe === universeFilter;
    const categoryMatch = !categoryFilter || book.category === categoryFilter;
    return universeMatch && categoryMatch;
  });

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/library"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Library Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Library Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample library inventory data for institutional resource tracking.
                </br>
                Prototype data — not connected to live library systems.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setUniverseFilter(e.target.value)}
                >
                  <option value="">All Universes</option>
                  <option value="junior">JUNIOR</option>
                  <option value="nexus">NEXUS</option>
                  <option value="ascend">ASCEND</option>
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Textbook">Textbooks</option>
                  <option value="Literature">Literature</option>
                  <option value="Elective">Electives</option>
                </select>
              </div>
            </section>

            {/* Library Inventory Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Book Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Title</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Author</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Class</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Category</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Total</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{book.title}</td>
                        <td className="border-border border-border px-4 py-2">{book.author}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{book.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {book.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{book.category}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium">{book.quantity}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-success">{book.available}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Library Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Library Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Total Books</p>
                  <p className="font-medium">{books.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Total Available</p>
                  <p className="font-medium">{filteredBooks.reduce((sum, b) => sum + b.available, 0)}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-info/5 border-info">
                  <p className="text-xs text-info mb-1">Total Quantity</p>
                  <p className="font-medium">{filteredBooks.reduce((sum, b) => sum + b.quantity, 0)}</p>
                </div>
              </div>
            </section>

            {/* Library Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Library inventory data is prototype-only for institutional resource tracking demonstration</li>
                <li>All book records are sample data and not connected to live library management systems</li>
                <li>Book availability tracking is prototype-only — actual inventory management through official channels</li>
                <li>Categorization is for demonstration purposes and may not reflect actual library classification</li>
                <li>All data is prototype-only and not connected to external databases</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}