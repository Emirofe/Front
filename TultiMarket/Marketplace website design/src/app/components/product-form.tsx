import { useState, useRef } from "react";
import { Upload, X, Loader } from "lucide-react";
import { Product } from "../data/mock-data";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

interface ProductImage {
  id: string;
  url: string;
  file: File;
  isUploading: boolean;
}

interface ProductFormProps {
  isEditing: boolean;
  formData: ProductFormData;
  onFormChange: (field: keyof ProductFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onImagesChange?: (images: ProductImage[]) => void;
  categories: Array<{ id: string; name: string }>;
  isLoading?: boolean;
  initialImages?: ProductImage[];
}

export function ProductForm({
  isEditing,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  onImagesChange,
  categories,
  isLoading = false,
  initialImages = [],
}: ProductFormProps) {
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    Array.from(files).forEach((file) => {
      if (!validTypes.includes(file.type)) {
        console.warn(`Archivo ${file.name} no es una imagen válida`);
        return;
      }

      // Si el archivo es mayor a 2MB, comprimir
      if (file.size > 2 * 1024 * 1024) {
        compressImage(file);
      } else {
        processImage(file);
      }
    });
  };

  const compressImage = (file: File) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo aspect ratio
      const maxWidth = 1200;
      const maxHeight = 1200;
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Dibujar imagen comprimida
      ctx?.drawImage(img, 0, 0, width, height);

      // Convertir a blob con calidad reducida
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          processImage(compressedFile);
        }
      }, file.type, 0.8); // 80% calidad
    };

    img.src = URL.createObjectURL(file);
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const imageId = `img-${Date.now()}-${Math.random()}`;
      const newImage: ProductImage = {
        id: imageId,
        url,
        file,
        isUploading: true,
      };

      setImages((prev) => {
        const updated = [...prev, newImage];
        onImagesChange?.(updated);
        return updated;
      });

      // Simular carga de imagen
      setTimeout(() => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === imageId ? { ...img, isUploading: false } : img
          )
        );
      }, 1500);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      onImagesChange?.(updated);
      return updated;
    });
  };
  return (
    <div className="bg-white rounded-xl border border-border p-6 mb-6">
      <h3 className="mb-4" style={{ fontSize: 18, fontWeight: 600 }}>
        {isEditing ? "Editar Producto" : "Nuevo Producto"}
      </h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>
            Nombre del producto
          </label>
          <input
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
            style={{ fontSize: 14 }}
            required
            disabled={isLoading}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>
            Descripcion
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onFormChange("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
            style={{ fontSize: 14 }}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>
            Precio (MXN)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => onFormChange("price", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
            style={{ fontSize: 14 }}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>
            Stock
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => onFormChange("stock", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
            style={{ fontSize: 14 }}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-1 text-muted-foreground" style={{ fontSize: 13 }}>
            Categoria (Fiestas)
          </label>
          <select
            value={formData.category}
            onChange={(e) => onFormChange("category", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-input-background"
            style={{ fontSize: 14 }}
            disabled={isLoading}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload Area */}
        <div className="sm:col-span-2">
          <label className="block mb-2 text-muted-foreground" style={{ fontSize: 13 }}>
            Imagenes ({images.length})
          </label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
              disabled={isLoading}
            >
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground" style={{ fontSize: 13 }}>
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-muted-foreground" style={{ fontSize: 12 }}>
                (JPG, PNG, GIF, WebP - Se comprimen automáticamente si &gt; 2MB)
              </p>
            </button>
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                  {img.isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader size={20} className="text-white animate-spin" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    disabled={img.isUploading || isLoading}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-2 flex gap-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: 14 }}
            disabled={isLoading}
          >
            {isLoading
              ? "Guardando..."
              : isEditing
              ? "Actualizar"
              : "Crear Producto"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontSize: 14 }}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}