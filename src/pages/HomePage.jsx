import ProductList from "@/components/products/ProductList";

const HomePage = () => {
  return (
    <>
      <main className="min-h-[80vh] max-w-screen-lg px-4 sm:px-0 mx-auto container mt-8">
        <div className="flex flex-col items-center max-w-2xl pb-20 text-center mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Become a trend-setter with us.
          </h1>
          <p className="mt-6 text-base max-w-prose mx-auto text-muted-foreground ">
            VogueShop provides with the finest clothings and ensures your
            confidence throughout your days.
          </p>
        </div>

        <ProductList />
      </main>
    </>
  );
};

export default HomePage;
