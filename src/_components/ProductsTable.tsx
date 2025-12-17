import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/product";

export default function ProductsTable({ items }: { items: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Catégorie</TableHead>
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
  );
}
