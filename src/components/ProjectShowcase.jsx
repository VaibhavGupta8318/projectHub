import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Eye,
  Plus,
  Trash2,
  Edit,
  X,
  Send,
  Briefcase,
} from "lucide-react";

const ADMIN_EMAIL = "satishhgh98@gmail.com";
const ADMIN_PASSWORD = "admin@123";

/* ------------------ DUMMY PROJECTS ------------------ */
const DUMMY_PROJECTS = [
  {
    id: "1",
    title: "AI Resume Analyzer",
    description: "AI-powered resume screening.",
    price: "3999",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
  },
  {
    id: "2",
    title: "Hospital Management System",
    description: "Admin, doctor & patient dashboards.",
    price: "8999",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800",
  },
  {
    id: "3",
    title: "E-Learning Platform",
    description: "Courses, quizzes & certificates.",
    price: "6999",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
  },
  {
    id: "4",
    title: "Stock Market Analyzer",
    description: "Stock insights & analytics.",
    price: "7499",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  },
  {
    id: "5",
    title: "Online Examination System",
    description: "Secure exam platform.",
    price: "5999",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800",
  },
];

const ProjectShowcase = () => {
  const [view, setView] = useState("visitor");
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const [buyForm, setBuyForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [customForm, setCustomForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectTitle: "",
    description: "",
    budget: "",
    timeline: "",
  });

  /* ---------------- LOAD PROJECTS ---------------- */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects"));
    if (!stored || stored.length < 5) {
      localStorage.setItem("projects", JSON.stringify(DUMMY_PROJECTS));
      setProjects(DUMMY_PROJECTS);
    } else {
      setProjects(stored);
    }
  }, []);

  const saveProjects = (data) => {
    setProjects(data);
    localStorage.setItem("projects", JSON.stringify(data));
  };

  /* ---------------- ADMIN LOGIN ---------------- */
  const handleAdminLogin = () => {
    if (
      adminForm.email === ADMIN_EMAIL &&
      adminForm.password === ADMIN_PASSWORD
    ) {
      setIsAdmin(true);
      setView("admin");
      setShowAdminLogin(false);
    } else {
      alert("Invalid admin credentials");
    }
  };

  /* ---------------- ADD / UPDATE PROJECT ---------------- */
  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.price) return;

    if (editingProject) {
      saveProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...projectForm, id: p.id } : p
        )
      );
    } else {
      saveProjects([
        ...projects,
        { ...projectForm, id: Date.now().toString() },
      ]);
    }

    setShowProjectModal(false);
    setEditingProject(null);
    setProjectForm({ title: "", description: "", price: "", image: "" });
  };

  /* ---------------- BUY PROJECT ---------------- */
  const handleBuySubmit = () => {
    const body = `
Project: ${selectedProject.title}
Price: ₹${selectedProject.price}

Name: ${buyForm.name}
Email: ${buyForm.email}
Phone: ${buyForm.phone}
Message: ${buyForm.message}
`;

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=Project Purchase&body=${encodeURIComponent(
      body
    )}`;
    setShowBuyModal(false);
  };

  /* ---------------- CUSTOM PROJECT ---------------- */
  const handleCustomSubmit = () => {
    const body = `
CUSTOM PROJECT REQUEST

Name: ${customForm.name}
Email: ${customForm.email}
Phone: ${customForm.phone}

Project Title: ${customForm.projectTitle}
Description: ${customForm.description}
Budget: ₹${customForm.budget}
Timeline: ${customForm.timeline}
`;

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=Custom Project Request&body=${encodeURIComponent(
      body
    )}`;

    setShowCustomModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* ---------------- HEADER ---------------- */}
      <header className="border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Briefcase size={18} />
            </div>
            <div>
              <h1 className="text-lg font-semibold">ProjectHub</h1>
              <p className="text-xs text-purple-300">
                Premium Ready-to-Use Projects
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              view === "visitor"
                ? setShowAdminLogin(true)
                : (setView("visitor"), setIsAdmin(false))
            }
            className="text-xs px-4 py-1.5 rounded-lg border border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white"
          >
            {view === "visitor" ? "Admin" : "Visitor"}
          </button>
        </div>
      </header>

      {/* ---------------- VISITOR VIEW ---------------- */}
      {view === "visitor" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 rounded-xl overflow-hidden"
              >
                <img src={p.image} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="text-xs text-gray-300">{p.description}</p>
                  <div className="flex justify-between mt-4">
                    <span className="font-bold text-purple-400">
                      ₹{p.price}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProject(p);
                        setShowBuyModal(true);
                      }}
                      className="bg-pink-600 text-xs px-3 py-1.5 rounded-md"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---- CUSTOM PROJECT CTA ---- */}
          <div className="text-center pb-12">
            <p className="text-sm text-gray-300 mb-3">
              Didn’t find what you’re looking for?
            </p>
            <button
              onClick={() => setShowCustomModal(true)}
              className="bg-purple-600 px-6 py-2 rounded-lg text-sm hover:bg-purple-700"
            >
              Request Custom Project
            </button>
          </div>
        </>
      )}

      {/* ---------------- ADMIN VIEW ---------------- */}
      {view === "admin" && isAdmin && (
        <div className="max-w-7xl mx-auto p-6">
          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-green-600 text-xs px-4 py-2 rounded-lg mb-6 flex gap-2"
          >
            <Plus size={14} /> Add Project
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white/10 p-4 rounded-xl">
                <img
                  src={p.image}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-2 text-sm font-semibold">{p.title}</h3>
                <div className="flex justify-between mt-3">
                  <Edit
                    size={16}
                    className="cursor-pointer text-yellow-400"
                    onClick={() => {
                      setEditingProject(p);
                      setProjectForm(p);
                      setShowProjectModal(true);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() =>
                      saveProjects(projects.filter((x) => x.id !== p.id))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MODALS ---------------- */}
      {showAdminLogin && (
        <Modal onClose={() => setShowAdminLogin(false)}>
          <input
            className="input"
            placeholder="Email"
            onChange={(e) =>
              setAdminForm({ ...adminForm, email: e.target.value })
            }
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setAdminForm({ ...adminForm, password: e.target.value })
            }
          />
          <button className="btn" onClick={handleAdminLogin}>
            Login
          </button>
        </Modal>
      )}

      {showProjectModal && (
        <Modal onClose={() => setShowProjectModal(false)}>
          <input
            className="input"
            placeholder="Title"
            value={projectForm.title}
            onChange={(e) =>
              setProjectForm({ ...projectForm, title: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Price"
            value={projectForm.price}
            onChange={(e) =>
              setProjectForm({ ...projectForm, price: e.target.value })
            }
          />
          <textarea
            className="input"
            placeholder="Description"
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
          />
          <button className="btn" onClick={handleSaveProject}>
            Save
          </button>
        </Modal>
      )}

      {showBuyModal && (
        <Modal onClose={() => setShowBuyModal(false)}>
          <input
            className="input"
            placeholder="Name"
            onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Email"
            onChange={(e) => setBuyForm({ ...buyForm, email: e.target.value })}
          />
          <input
            className="input"
            placeholder="Phone"
            onChange={(e) => setBuyForm({ ...buyForm, phone: e.target.value })}
          />
          <textarea
            className="input"
            placeholder="Message"
            onChange={(e) =>
              setBuyForm({ ...buyForm, message: e.target.value })
            }
          />
          <button className="btn bg-green-600" onClick={handleBuySubmit}>
            <Send size={14} /> Submit
          </button>
        </Modal>
      )}

      {showCustomModal && (
        <Modal onClose={() => setShowCustomModal(false)}>
          <input
            className="input"
            placeholder="Your Name"
            onChange={(e) =>
              setCustomForm({ ...customForm, name: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Email"
            onChange={(e) =>
              setCustomForm({ ...customForm, email: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Phone"
            onChange={(e) =>
              setCustomForm({ ...customForm, phone: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Project Title"
            onChange={(e) =>
              setCustomForm({ ...customForm, projectTitle: e.target.value })
            }
          />
          <textarea
            className="input"
            placeholder="Project Description"
            onChange={(e) =>
              setCustomForm({ ...customForm, description: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Expected Budget"
            onChange={(e) =>
              setCustomForm({ ...customForm, budget: e.target.value })
            }
          />
          <input
            className="input"
            placeholder="Timeline (e.g. 2 months)"
            onChange={(e) =>
              setCustomForm({ ...customForm, timeline: e.target.value })
            }
          />
          <button className="btn bg-purple-600" onClick={handleCustomSubmit}>
            Send Request
          </button>
        </Modal>
      )}
    </div>
  );
};

/* ---------------- MODAL COMPONENT ---------------- */
const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
    <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md relative space-y-3">
      <X
        size={16}
        className="absolute top-3 right-3 cursor-pointer"
        onClick={onClose}
      />
      {children}
    </div>
  </div>
);

/* ---------------- STYLES ---------------- */
const style = document.createElement("style");
style.innerHTML = `
.input {
  width:100%;
  padding:8px;
  border-radius:8px;
  background:rgba(255,255,255,0.1);
  border:none;
  color:white;
  font-size:12px;
}
.btn {
  width:100%;
  padding:8px;
  border-radius:8px;
  background:#7c3aed;
  color:white;
  font-size:12px;
}
`;
document.head.appendChild(style);

export default ProjectShowcase;
