/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

const productFormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(255),
  price: z.coerce.number().min(10000, "Price must be at least Rp 10.000"),
  stock: z.coerce.number().min(1, "Stock must be at least 1"),
  imgUrl: z.string().url("Must be a valid URL"),
});

const ProductForm = ({
  onSubmit,
  isLoading,
  title,
  description,
  btnText,
  textLoading,
  className,
  defaultTitle,
  defaultDescription,
  defaultPrice,
  defaultStock,
  defaultImgUrl,
}) => {
  const form = useForm({
    defaultValues: {
      title: defaultTitle || "",
      description: defaultDescription || "",
      price: defaultPrice || 0,
      stock: defaultStock || 0,
      imgUrl: defaultImgUrl || "",
    },
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl p-4 border">
          <CardHeader className="flex flex-col">
            <CardTitle className={className}>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Product</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Product</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col space-y-4 w-full">
              {isLoading ? (
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                  variant="default"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {textLoading}
                </Button>
              ) : (
                <Button type="submit" className="w-full" variant="default">
                  {btnText}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProductForm;
