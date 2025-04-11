import React from "react";
import ClientesView from "../../components/views/ClientesView";
import { title } from "process";

export const Clients = () => {
  return <ClientesView />
};

export default Clients;
export const metadata = {
  title: "Clientes",
  description: "Lista de clientes",
};