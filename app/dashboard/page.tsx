"use client";

import Link from "next/link";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [agents, setAgents] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  const loadAgentsList = async () => {
    setAgents([]);
    setIsLoading(true);
    const response = await fetch("/api/agent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok){
      setIsLoading(false);
    }
    
    if( response.status == 200){
      const data = await response.json();
      setAgents(data.agents);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAgentsList();
       //return ( /* Call to clean up after app unmounted*/);
  },[])

  const deleteAgent = async ( id: string ) => {
    const response = await fetch("/api/agent", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      })
    });

    if(!response.ok){
      setIsLoading(false);
    }

    if( response.status == 200){
      const data: any = await response.json();
      if( data.output.acknowledged && data.output.deletedCount > 0 ){
        let temp: any = agents.filter((a: any) => a._id != id);
        setAgents(temp);
      }
    }
  }

  return (
    <div className="h-screen">
      <Header />

      <main className="grow">
        <div className="px-8 pt-10 md:px-20 text-black flex items-end">
          <div className="grow text-white">
              <h1 className="text-2xl font-semibold md:text-3xl ">
                Agent Management
              </h1>
              <p className="mt-2 text-sm">
                Manage your agents list
              </p>
          </div>
          <div><Link className="button" href="/dashboard/create-agent">Create an agent</Link></div>
        </div>

        <div className="grid lg:grid-cols-1">
          <div className="px-8 pt-0 pb-5 md:px-20 lg:py-10 text-black flex">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Availability</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading ? (
                    <tr className="bg-white border-b light:bg-light-800 light:border-light-700 text-black">
                      <td colSpan={4} className="text-center py-3">Loading ...</td>
                    </tr>
                  ) :
                  agents.length == 0 ? (
                    <tr className="bg-white border-b light:bg-light-800 light:border-light-700 text-black">
                      <td colSpan={4} className="text-center py-3">No agents to display</td>
                    </tr>
                  ) :
                  (agents.map((_:any)=>
                    <tr className="bg-white border-b light:bg-light-800 light:border-light-700 text-black">
                      <td  className="px-6 py-4">{_.name}</td>
                      <td  className="px-6 py-4">{_.phone}</td>
                      <td  className="px-6 py-4">{_.availability}</td>
                      <td  className="px-6 py-4">
                        <Link href={"/dashboard/"+_._id} className="button button-sm me-2">Edit</Link>
                        <button onClick={(e) => deleteAgent(_._id)} className="button button-sm">Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}