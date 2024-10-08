/* eslint-disable react/prop-types */
import {
  IoAdd,
  IoCartOutline,
  IoPerson,
  IoPricetagOutline,
} from "react-icons/io5";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const SidebarItem = ({ children }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full rounded-none justify-start flex  px-0 tracking-tight"
    >
      {children}
    </Button>
  );
};

const AdminLayout = ({ title, description, rightSection, children }) => {
  return (
    <div className="flex ">
      <aside className="w-72 border-r h-screen">
        <div className="flex flex-col h-16 items-start justify-center border-b px-4">
          <img src={logo} alt="logo company" className="w-2/5" />
        </div>

        <div className="flex flex-col space-y-0 py-4">
          <div className="px-4 flex flex-col space-y-1">
            <h1 className="text-muted-foreground text-xs font-semibold">
              PRODUTCS
            </h1>
            <Link to={"/admin/products"}>
              <SidebarItem>
                <IoPricetagOutline className="h-5 w-5 mr-2 " />
                All Products
              </SidebarItem>
            </Link>
            <SidebarItem>
              <IoCartOutline className="h-5 w-5 mr-2 " />
              Orders
            </SidebarItem>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b w-full flex justify-end items-center px-8">
          <Button className="rounded-full " size="icon">
            <IoPerson className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div>
              <h1 className="font-semibold tracking-tight text-4xl">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {rightSection}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
