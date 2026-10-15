import React, { createContext, useContext, useState, useEffect } from 'react';
import { Producto, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (producto: Producto, cantidad?: number) => void;
  removeFromCart: (productoId: string) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'inversa_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar carrito de localStorage:', e);
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error al guardar carrito en localStorage:', e);
    }
  }, [items]);

  const addToCart = (producto: Producto, cantidad = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.producto.id === producto.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].cantidad + cantidad;
        // Si es hardware, validar que no exceda el stock
        if (producto.tipo === 'hardware' && newQty > producto.stock) {
          alert(`Solo hay ${producto.stock} unidades disponibles en inventario.`);
          return prevItems;
        }
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: newQty
        };
        return updated;
      }

      if (producto.tipo === 'hardware' && producto.stock <= 0) {
        alert('Este producto físico se encuentra agotado.');
        return prevItems;
      }

      return [...prevItems, { producto, cantidad }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productoId: string) => {
    setItems((prev) => prev.filter((item) => item.producto.id !== productoId));
  };

  const updateQuantity = (productoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeFromCart(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.producto.id === productoId) {
          if (item.producto.tipo === 'hardware' && cantidad > item.producto.stock) {
            alert(`Stock máximo alcanzado (${item.producto.stock} unidades).`);
            return item;
          }
          return { ...item, cantidad };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);

  const subtotal = items.reduce((sum, item) => {
    const precio = item.producto.precioOferta ?? item.producto.precio;
    return sum + precio * item.cantidad;
  }, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isOpen,
        setIsOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
