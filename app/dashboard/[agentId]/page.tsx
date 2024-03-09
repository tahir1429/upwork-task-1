"use client";

import Link from "next/link";
import React, { useState, useEffect } from 'react';

export default function EditAgentPage({ params }: { params: { agentId: string } }) {
    const [agent, setAgent] : any = useState({}); 
    const [name, setName] = useState(''); 
    const [instructions, setInstructions] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [availability, setAvailability] = useState(''); 
    const [isFormValid, setIsFormValid] = useState(false); 
    const [isFormSubmitted, setIsFormFormSubmitted] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    const [errors, setErrors] : any = useState({}); 



    useEffect(() => { 
        validateForm(); 
      }, [name, instructions, phone, availability]); 
      
    // Validate form 
    const validateForm = () => { 
        let errors: any = {}; 
  
        if (!name) { 
            errors.name = 'Name is required.'; 
        } 
  
        if (!instructions) { 
          errors.instructions = 'Instructions are required.'; 
        } 
  
        if (!phone) { 
          errors.phone = 'Phone number is required.'; 
        } 
  
        if (!availability) { 
          errors.availability = 'Availability is required.'; 
        } 
  
        setErrors(errors); 
        setIsFormValid(Object.keys(errors).length === 0); 
    }; 

    // Submit 
    const handleSubmit = async () => { 
        setIsFormFormSubmitted(true);
        if (isFormValid) { 
          // const { user } = useUser();
    
          const response = await fetch("/api/agent", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({
              _id: params.agentId,
              name: name, 
              instructions: instructions,
              phone: phone, 
              availability: availability
            })
          });

          if( !response.ok ){
            alert(response.statusText);
          }
    
          if( response.status == 200 ){
            alert('Agent Updated Successfully');
          }
        } else { 
            alert('Form has errors. Please correct them.');
        } 
    }; 

    // Find Agent 
    const getAgent = async ( agentId: string ) => { 
        setIsLoading(true);
        const response = await fetch("/api/agent/single?id="+agentId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });

        if( !response.ok ){
            setAgent({});
            setIsLoading(false);
            alert(response.statusText);
        }

        if( response.status == 200){
            const data = await response.json();
            if( data.agent ){
                setAgent(data.agent);
                setInstructions(data.agent.instructions);
                setPhone(data.agent.phone);
                setAvailability(data.agent.availability);
                setName(data.agent.name);
            }else{
                setAgent({});
            }
            setIsLoading(false);
        }
    }; 

    useEffect(() => {
        getAgent(params.agentId);
           //return ( /* Call to clean up after app unmounted*/);
    },[])
    

    return (
        <div className="mb-[10px] h-screen">
            <div className="px-20 py-5 mb-5">
                <div className="flex">
                    <div><Link href="/dashboard">Back</Link></div>
                </div>
            </div>
            
            <main className="grow">
                <div className="px-20">
                    <div className="grid grid-cols-1">
                        <div className="p-7 text-black bg-white flex rounded max-w-sm w-full mx-auto">
                            {
                                isLoading ? (<p>Loading ... </p>) :
                                !agent?.name ? (<p>No record found</p>) :
                                (<div className="w-full">
                                    <div className="input-group mb-3">
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
                                    {(isFormSubmitted && errors.name) && <p className="text-[#FF0000]">* {errors.name}</p>} 
                                    </div>

                                    <div className="input-group mb-2">
                                    <label>Give instructions</label>
                                    <textarea rows={2} value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
                                    <div className="text-end">
                                        <small>{instructions.length} Characters</small>
                                    </div>
                                    {(isFormSubmitted && errors.instructions) && <p className="text-[#FF0000]">* {errors.instructions}</p>} 
                                    </div>

                                    <div className="input-group mb-3">
                                    <label>Enter a phone number you’d like your AI to forward the call to</label>
                                    <input type="tel" name="phone" placeholder="(+1) 123 123 1234" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    {(isFormSubmitted && errors.phone) && <p className="text-[#FF0000]">* {errors.phone}</p>} 
                                    </div>

                                    <div className="input-group mb-3">
                                    <label>Connect your calendar</label>
                                    <button className="button button-sm mb-2" type="button">Connect to your calendly</button>

                                    <label>write any other time you’re available</label>
                                    <input type="time" name="availability" placeholder="(+1) 123 123 1234" value={availability} onChange={(e) => setAvailability(e.target.value)} />
                                    {(isFormSubmitted && errors.availability) && <p className="text-[#FF0000]">* {errors.availability}</p>} 
                                    </div>
                                    <button 
                                    style={{ opacity: isFormValid ? 1 : 0.5 }} 
                                    disabled={!isFormValid}  
                                    className="button w-full mt-3" 
                                    type="button" 
                                    onClick={handleSubmit}>
                                        Update Agent
                                    </button>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}