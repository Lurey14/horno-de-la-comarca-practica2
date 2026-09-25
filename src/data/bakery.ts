export type ProductCategory = 'Panes' | 'Dulces' | 'Bebidas'

export interface BakeryProduct {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  symbol: string
  art: string
  note?: string
}

export const bakeryProducts: BakeryProduct[] = [
  { id: 'pan-viaje', name: 'Pan de viaje élfico', category: 'Panes', price: 14, description: 'Suave, dorado y envuelto con hojas para el camino.', symbol: '✧', art: 'waybread', note: 'Favorito del camino' },
  { id: 'miel-beorn', name: 'Pan de miel de Beorn', category: 'Panes', price: 18, description: 'Miga tierna, miel silvestre y un toque de nuez.', symbol: '✿', art: 'honey', note: 'Horneado hoy' },
  { id: 'hogaza-comarca', name: 'Hogaza de la Comarca', category: 'Panes', price: 12, description: 'Corteza rústica para compartir junto al fuego.', symbol: '⌂', art: 'loaf' },
  { id: 'tarta-manzana', name: 'Tarta de manzana', category: 'Dulces', price: 16, description: 'Manzana especiada bajo una cubierta crujiente.', symbol: '❧', art: 'apple', note: 'Receta de la casa' },
  { id: 'bollitos-dragon', name: 'Bollitos del Dragón Verde', category: 'Dulces', price: 10, description: 'Pequeños rollos de canela, suaves como una posada.', symbol: '☼', art: 'swirl' },
  { id: 'galletas-lorien', name: 'Galletas de Lórien', category: 'Dulces', price: 9, description: 'Galletas finas de avena, almendra y flores.', symbol: '✦', art: 'cookie' },
  { id: 'cacao-moria', name: 'Cacao de las Montañas', category: 'Bebidas', price: 11, description: 'Chocolate caliente, oscuro y reconfortante.', symbol: '♨', art: 'cocoa' },
  { id: 'te-hobbiton', name: 'Té de Hobbiton', category: 'Bebidas', price: 8, description: 'Té de hierbas con aroma a jardín después de la lluvia.', symbol: '☘', art: 'tea' },
]
