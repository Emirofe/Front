import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Store, Eye, EyeOff } from "lucide-react";
import { useStore } from "../context/store-context";
import { toast } from "sonner";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("comprador");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  // Business Fields for Sellers
  const [businessName, setBusinessName] = useState("");
  const [rfc, setRfc] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  const { register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Completa todos los campos");
      return;
    }
    if (role === "vendedor" && (!businessName || !rfc || !businessAddress)) {
      toast.error("Por favor completa los datos de tu negocio");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contrasenas no coinciden");
      return;
    }
    if (email === "existente@correo.com") {
      setEmailError("Este correo ya esta registrado");
      return;
    }
    register(name, email, password, role);
    toast.success("Cuenta creada exitosamente");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Store size={36} className="text-primary" />
            <span className="text-primary" style={{ fontSize: 28, fontWeight: 700 }}>TultiMarket</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          <h1 className="text-center mb-6" style={{ fontSize: 24, fontWeight: 600 }}>Crear Cuenta</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1.5" style={{ fontSize: 14 }}>Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                style={{ fontSize: 14 }}
              />
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: 14 }}>Correo electronico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="tu@correo.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  emailError ? "border-red-500" : "border-border"
                } bg-input-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                style={{ fontSize: 14 }}
              />
              {emailError && (
                <p className="text-red-500 mt-1" style={{ fontSize: 13 }}>{emailError}</p>
              )}
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: 14 }}>Contrasena</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimo 8 caracteres"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                  style={{ fontSize: 14 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: 14 }}>Confirmar contrasena</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contrasena"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                style={{ fontSize: 14 }}
              />
            </div>

            <div>
              <label className="block mb-2" style={{ fontSize: 14 }}>Tipo de cuenta</label>
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={() => setRole("comprador")}
                  className={`flex-1 py-2.5 transition-colors ${
                    role === "comprador" ? "bg-primary text-white" : "bg-white text-muted-foreground hover:bg-gray-50"
                  }`}
                  style={{ fontSize: 14 }}
                >
                  Comprador
                </button>
                <button
                  type="button"
                  onClick={() => setRole("vendedor")}
                  className={`flex-1 py-2.5 transition-colors ${
                    role === "vendedor" ? "bg-primary text-white" : "bg-white text-muted-foreground hover:bg-gray-50"
                  }`}
                  style={{ fontSize: 14 }}
                >
                  Vendedor
                </button>
              </div>
            </div>

            {role === "vendedor" && (
              <div className="space-y-4 pt-4 border-t border-border mt-4">
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>Datos del Negocio</h3>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: 13 }}>Nombre del Negocio</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ej. Eventos Tultitlan"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:border-primary outline-none"
                    style={{ fontSize: 14 }}
                  />
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: 13 }}>RFC del Negocio</label>
                  <input
                    type="text"
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value)}
                    placeholder="RFC de 13 digitos"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:border-primary outline-none uppercase"
                    style={{ fontSize: 14 }}
                  />
                </div>
                <div>
                  <label className="block mb-1.5" style={{ fontSize: 13 }}>Direccion Fiscal / Local</label>
                  <input
                    type="text"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    placeholder="Calle, Numero, Col, CP"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:border-primary outline-none"
                    style={{ fontSize: 14 }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
              style={{ fontSize: 16, fontWeight: 600 }}
            >
              Crear Cuenta
            </button>
          </form>

          <p className="text-center mt-6 text-muted-foreground" style={{ fontSize: 14 }}>
            Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline" style={{ fontWeight: 600 }}>
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}