// Admin.tsx
// -------------------------
// Admin Dashboard Component
// -------------------------
// Purpose:
// - Manage quiz topics: Add, Edit, Delete
// - Display list of topics in a table
// - Confirm updates and deletions with dialogs

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// -------------------------
// Type Definitions
// -------------------------
// Represents a quiz topic object
interface QuizTopic {
  id: number;
  code: string;
  name: string;
  description: string;
}

const Admin = () => {
  // -------------------------
  // STATE MANAGEMENT
  // -------------------------
  const [topics, setTopics] = useState<QuizTopic[]>([]); // List of topics
  const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching topics
  const [form, setForm] = useState<Partial<QuizTopic>>({ // Form state for Add/Edit
    code: "",
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null); // Currently editing topic ID

  // Confirmation dialog state
  const [confirmType, setConfirmType] = useState<"update" | "delete" | null>(null); 
  const [targetId, setTargetId] = useState<number | null>(null); // Target topic ID for deletion

  const { toast } = useToast();

  // -------------------------
  // FETCH TOPICS FROM BACKEND
  // -------------------------
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8181/api/topics");
      const data = await res.json();
      setTopics(data); // Save fetched topics
    } catch (err) {
      console.error("Error fetching topics", err);
      toast({
        title: "Error",
        description: "Failed to load topics.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch topics on component mount
  useEffect(() => {
    fetchTopics();
  }, []);

  // -------------------------
  // FORM HANDLING
  // -------------------------
  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // CRUD OPERATIONS
  // -------------------------

  // Add new topic
  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:8181/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add");

      toast({
        title: "New Topic Added",
        description: `${form.name} has been added successfully.`,
        className: "bg-green-500 text-white",
      });

      setForm({ code: "", name: "", description: "" });
      fetchTopics(); // Refresh topics list
    } catch (err) {
      console.error("Error adding topic", err);
      toast({
        title: "Failed Adding",
        description: "Something went wrong while adding topic.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // Update existing topic
  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      const res = await fetch(`http://localhost:8181/api/topics/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");

      toast({
        title: "Topic Updated",
        description: `${form.name} has been updated successfully.`,
        className: "bg-green-500 text-white",
      });

      setForm({ code: "", name: "", description: "" });
      setEditingId(null);
      fetchTopics();
    } catch (err) {
      console.error("Error updating topic", err);
      toast({
        title: "Failed Updating",
        description: "Something went wrong while updating topic.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // Delete topic
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8181/api/topics/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      toast({
        title: "Topic Deleted",
        description: "Topic removed successfully.",
        className: "bg-green-500 text-white",
      });

      fetchTopics();
    } catch (err) {
      console.error("Error deleting topic", err);
      toast({
        title: "Failed Deleting",
        description: "Something went wrong while deleting topic.",
        className: "bg-red-500 text-white",
      });
    }
  };

  // -------------------------
  // START EDITING
  // -------------------------
  const startEdit = (topic: QuizTopic) => {
    setEditingId(topic.id);
    setForm({
      code: topic.code,
      name: topic.name,
      description: topic.description,
    });
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-quiz-primary/5">
      {/* Global Navbar */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-3">
            Manage quiz topics: add, edit, or remove topics easily.
          </p>
        </div>

        {/* =======================
            Topic Management Form
        ======================= */}
        <Card className="shadow-quiz border-0 bg-gradient-card max-w-4xl mx-auto animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-quiz-primary" />
              {editingId ? "Update Topic" : "Add New Topic"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={form.code || ""}
                  onChange={handleChange}
                  placeholder="e.g., general, science"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                  placeholder="Topic name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={form.description || ""}
                  onChange={handleChange}
                  placeholder="Short description"
                />
              </div>
            </div>
            <Button
              onClick={() =>
                editingId
                  ? setConfirmType("update")
                  : handleAdd()
              }
              className="bg-gradient-primary text-white w-full"
            >
              {editingId ? "Update Topic" : "Add Topic"}
            </Button>
          </CardContent>
        </Card>

        {/* =======================
            Topics Table
        ======================= */}
        <Card className="mt-10 shadow-quiz border-0 bg-gradient-card max-w-4xl mx-auto animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">
              Topics List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">
                Loading topics...
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[15%]">Code</TableHead>
                    <TableHead className="w-[20%]">Name</TableHead>
                    <TableHead className="w-[45%]">Description</TableHead>
                    <TableHead className="w-[20%] text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topics.map((topic) => (
                    <TableRow key={topic.id}>
                      <TableCell className="font-medium">{topic.code}</TableCell>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell>{topic.description}</TableCell>
                      <TableCell className="flex justify-center gap-3">
                        {/* Edit button triggers form prefill */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(topic)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Edit
                        </Button>

                        {/* Delete button opens confirmation dialog */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setTargetId(topic.id);
                            setConfirmType("delete");
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* =======================
          Confirmation Dialog
      ======================= */}
      <AlertDialog
        open={!!confirmType}
        onOpenChange={(open) => !open && setConfirmType(null)}
      >
        <AlertDialogContent className="rounded-2xl shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-bold">
              {confirmType === "update"
                ? "Update this topic?"
                : "Delete this topic?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {confirmType === "update"
                ? "Are you sure you want to update this topic?"
                : "Are you sure you want to delete this topic?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center gap-4">
            <AlertDialogCancel
              className="px-6"
              onClick={() => setConfirmType(null)}
            >
              No
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-6 bg-gradient-primary text-white"
              onClick={() => {
                if (confirmType === "update") {
                  handleUpdate();
                } else if (confirmType === "delete" && targetId) {
                  handleDelete(targetId);
                }
                setConfirmType(null);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
