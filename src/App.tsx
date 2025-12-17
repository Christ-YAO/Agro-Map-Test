import { useEffect, useState } from "react";
import "./App.css";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const averagePrice =
    items.length > 0
      ? items.reduce((sum, item) => sum + item.price, 0) / items.length
      : 0;
  const minPrice =
    items.length > 0 ? Math.min(...items.map((item) => item.price)) : 0;
  const maxPrice =
    items.length > 0 ? Math.max(...items.map((item) => item.price)) : 0;

  const STATS = [
    {
      label: "Nombre total de productos",
      value: items.length,
    },
    {
      label: "Prix moyen",
      value: `$${averagePrice.toFixed(2)}`,
    },
    {
      label: "Prix minimum",
      value: `$${minPrice}`,
    },
    {
      label: "Prix maximum",
      value: `$${maxPrice}`,
    },
  ];

  console.log(items);
  return (
    <div className="p-16">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <>
              {STATS.map((stat) => (
                <Card key={stat.label}>
                  <CardHeader>
                    <CardDescription> {stat.label} </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {stat.value}
                    </CardTitle>
                    <CardAction>
                      {/* <Badge variant="outline">
                    <IconTrendingUp />
                    +12.5%
                  </Badge> */}
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    {/* <div className="line-clamp-1 flex gap-2 font-medium">
                  Trending up this month <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Visitors for the last 6 months
                </div> */}
                  </CardFooter>
                </Card>
              ))}
            </>
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead className="text-right">Catégorie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default App;
