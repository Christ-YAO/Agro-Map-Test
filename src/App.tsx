import { useEffect, useState } from "react";
import "./App.css";
import { toast } from "sonner";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string; // ISO date
  updatedAt: string; // ISO date
}

function App() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setItems(data);
        toast.success("Items fetched successfully");
      } catch (error) {
        toast.error("Error fetching items");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  console.log(items);
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen animate-pulse">
          Loading...
        </div>
      )}
    </>
  );
}

export default App;
