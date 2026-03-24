import { Link } from "react-router";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-primary mb-2" style={{ fontSize: 72, fontWeight: 700 }}>404</h1>
          <h2 className="mb-4" style={{ fontSize: 24, fontWeight: 600 }}>Pagina no encontrada</h2>
          <p className="text-muted-foreground mb-6" style={{ fontSize: 16 }}>
            La pagina que buscas no existe o fue movida.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
